import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();
const tokenFor = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'kakal_kids_secret',
    { expiresIn: '7d' }
  );
const slugify = (value = '') =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
const productInclude = { category: true };

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password || '', user.password)))
    return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
  res.json({
    token: tokenFor(user),
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});
router.get('/auth/me', requireAuth, async (req, res) =>
  res.json(
    await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true },
    })
  )
);

router.get('/products', async (req, res) => {
  const { search = '', category, featured, new: fresh, promotion } = req.query;
  const where = {
    active: true,
    ...(search ? { name: { contains: search } } : {}),
    ...(category ? { category: { slug: category } } : {}),
    ...(featured ? { featured: true } : {}),
    ...(fresh ? { new: true } : {}),
    ...(promotion ? { promotion: true } : {}),
  };
  res.json(
    await prisma.product.findMany({
      where,
      include: productInclude,
      orderBy: { createdAt: 'desc' },
    })
  );
});
router.get('/products/:id', async (req, res) => {
  const key = req.params.id;
  const product = await prisma.product.findFirst({
    where: { OR: [{ slug: key }, ...(Number.isFinite(+key) ? [{ id: +key }] : [])] },
    include: productInclude,
  });
  product ? res.json(product) : res.status(404).json({ message: 'Produto não encontrado.' });
});
router.post('/products', requireAuth, async (req, res) => {
  const data = req.body;
  if (!data.name || Number(data.price) <= 0)
    return res.status(400).json({ message: 'Nome e preço válido são obrigatórios.' });
  res.status(201).json(
    await prisma.product.create({
      data: {
        ...data,
        price: +data.price,
        salePrice: data.salePrice ? +data.salePrice : null,
        stock: +data.stock || 0,
        minStock: +data.minStock || 3,
        slug: data.slug || slugify(data.name),
        categoryId: data.categoryId ? +data.categoryId : null,
      },
      include: productInclude,
    })
  );
});
router.put('/products/:id', requireAuth, async (req, res) => {
  const data = req.body;
  res.json(
    await prisma.product.update({
      where: { id: +req.params.id },
      data: {
        ...data,
        price: data.price ? +data.price : undefined,
        salePrice: data.salePrice ? +data.salePrice : null,
        stock: data.stock === undefined ? undefined : +data.stock,
        categoryId: data.categoryId ? +data.categoryId : null,
      },
      include: productInclude,
    })
  );
});
router.delete('/products/:id', requireAuth, async (req, res) => {
  await prisma.product.delete({ where: { id: +req.params.id } });
  res.status(204).end();
});
router.patch('/products/:id/status', requireAuth, async (req, res) =>
  res.json(
    await prisma.product.update({
      where: { id: +req.params.id },
      data: { active: !!req.body.active },
    })
  )
);

router.get('/categories', async (_req, res) =>
  res.json(await prisma.category.findMany({ orderBy: { name: 'asc' } }))
);
router.post('/categories', requireAuth, async (req, res) => {
  const data = req.body;
  res
    .status(201)
    .json(
      await prisma.category.create({ data: { ...data, slug: data.slug || slugify(data.name) } })
    );
});
router.put('/categories/:id', requireAuth, async (req, res) =>
  res.json(await prisma.category.update({ where: { id: +req.params.id }, data: req.body }))
);
router.delete('/categories/:id', requireAuth, async (req, res) => {
  await prisma.category.delete({ where: { id: +req.params.id } });
  res.status(204).end();
});

router.get('/customers', requireAuth, async (_req, res) =>
  res.json(
    await prisma.customer.findMany({
      include: { _count: { select: { orders: true } } },
      orderBy: { createdAt: 'desc' },
    })
  )
);
router.get('/customers/:id', requireAuth, async (req, res) =>
  res.json(
    await prisma.customer.findUnique({
      where: { id: +req.params.id },
      include: { orders: { include: { items: { include: { product: true } } } }, sales: true },
    })
  )
);
router.post('/customers', async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone)
    return res.status(400).json({ message: 'Nome e WhatsApp são obrigatórios.' });
  res.status(201).json(await prisma.customer.create({ data: req.body }));
});
router.put('/customers/:id', requireAuth, async (req, res) =>
  res.json(await prisma.customer.update({ where: { id: +req.params.id }, data: req.body }))
);
router.delete('/customers/:id', requireAuth, async (req, res) => {
  await prisma.customer.delete({ where: { id: +req.params.id } });
  res.status(204).end();
});

async function createOrder(req, res, isSale = false) {
  const {
    items = [],
    customer,
    customerId,
    payment = 'PIX',
    discount = 0,
    shipping = 0,
    address = '',
  } = req.body;
  if (!items.length)
    return res.status(400).json({ message: 'O pedido precisa ter pelo menos um item.' });
  try {
    const result = await prisma.$transaction(async (tx) => {
      let buyerId = customerId ? +customerId : null;
      if (!buyerId && customer?.name && customer?.phone) {
        const found = customer.email
          ? await tx.customer.findUnique({ where: { email: customer.email } })
          : null;
        buyerId = found?.id || (await tx.customer.create({ data: customer })).id;
      }
      if (!isSale && !buyerId) throw new Error('Informe seus dados para finalizar o pedido.');
      let subtotal = 0;
      const normalized = [];
      for (const item of items) {
        const product = await tx.product.findUnique({ where: { id: +item.productId } });
        if (!product || product.stock < +item.quantity)
          throw new Error(`Estoque insuficiente para ${product?.name || 'este produto'}.`);
        const price = product.salePrice || product.price;
        subtotal += price * +item.quantity;
        normalized.push({
          productId: product.id,
          quantity: +item.quantity,
          price,
          size: item.size || '',
          color: item.color || '',
        });
        await tx.product.update({
          where: { id: product.id },
          data: { stock: { decrement: +item.quantity } },
        });
        await tx.stockMovement.create({
          data: {
            productId: product.id,
            type: isSale ? 'VENDA' : 'PEDIDO',
            quantity: -Math.abs(+item.quantity),
            note: isSale ? 'Venda no balcão' : 'Pedido pelo checkout',
          },
        });
      }
      const total = Math.max(0, subtotal - +discount + +shipping);
      const code = `${isSale ? 'VND' : 'KKS'}${Date.now().toString().slice(-6)}`;
      return isSale
        ? tx.sale.create({
            data: {
              code,
              total,
              discount: +discount,
              payment,
              customerId: buyerId,
              items: { create: normalized.map(({ size, color, ...item }) => item) },
            },
            include: { items: { include: { product: true } }, customer: true },
          })
        : tx.order.create({
            data: {
              code,
              subtotal,
              discount: +discount,
              shipping: +shipping,
              total,
              payment,
              address,
              customerId: buyerId,
              items: { create: normalized },
            },
            include: { items: { include: { product: true } }, customer: true },
          });
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
router.get('/orders', requireAuth, async (_req, res) =>
  res.json(
    await prisma.order.findMany({
      include: { customer: true, items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    })
  )
);
router.get('/orders/:id', async (req, res) => {
  const key = req.params.id;
  const order = await prisma.order.findFirst({
    where: { OR: [{ code: key }, ...(Number.isFinite(+key) ? [{ id: +key }] : [])] },
    include: { customer: true, items: { include: { product: true } } },
  });
  order ? res.json(order) : res.status(404).json({ message: 'Pedido não encontrado.' });
});
router.post('/orders', (req, res) => createOrder(req, res));
router.patch('/orders/:id/status', requireAuth, async (req, res) =>
  res.json(
    await prisma.order.update({ where: { id: +req.params.id }, data: { status: req.body.status } })
  )
);
router.delete('/orders/:id', requireAuth, async (req, res) => {
  await prisma.order.delete({ where: { id: +req.params.id } });
  res.status(204).end();
});

router.get('/sales', requireAuth, async (_req, res) =>
  res.json(
    await prisma.sale.findMany({
      include: { customer: true, items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    })
  )
);
router.post('/sales', requireAuth, (req, res) => createOrder(req, res, true));
router.get('/sales/:id', requireAuth, async (req, res) =>
  res.json(
    await prisma.sale.findUnique({
      where: { id: +req.params.id },
      include: { customer: true, items: { include: { product: true } } },
    })
  )
);

router.get('/stock', requireAuth, async (_req, res) =>
  res.json(await prisma.product.findMany({ include: productInclude, orderBy: { stock: 'asc' } }))
);
router.get('/stock/movements', requireAuth, async (_req, res) =>
  res.json(
    await prisma.stockMovement.findMany({
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    })
  )
);
router.post('/stock/movement', requireAuth, async (req, res) => {
  const { productId, quantity, type = 'ENTRADA', note = '' } = req.body;
  if (!productId || !quantity)
    return res.status(400).json({ message: 'Produto e quantidade são obrigatórios.' });
  const change = type === 'ENTRADA' ? Math.abs(+quantity) : -Math.abs(+quantity);
  try {
    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: { id: +productId },
        data: { stock: { increment: change } },
      });
      if (product.stock < 0) throw new Error('O estoque não pode ficar negativo.');
      return tx.stockMovement.create({
        data: { productId: +productId, quantity: change, type, note },
        include: { product: true },
      });
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/promotions', requireAuth, async (_req, res) =>
  res.json({
    promotions: await prisma.promotion.findMany({ orderBy: { createdAt: 'desc' } }),
    coupons: await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } }),
  })
);
router.post('/promotions', requireAuth, async (req, res) => {
  const { coupon, ...promotion } = req.body;
  if (coupon?.code)
    return res
      .status(201)
      .json(
        await prisma.coupon.create({ data: { ...coupon, expiresAt: new Date(coupon.expiresAt) } })
      );
  res.status(201).json(
    await prisma.promotion.create({
      data: {
        ...promotion,
        startDate: new Date(promotion.startDate),
        endDate: new Date(promotion.endDate),
      },
    })
  );
});
router.put('/promotions/:id', requireAuth, async (req, res) =>
  res.json(await prisma.promotion.update({ where: { id: +req.params.id }, data: req.body }))
);
router.delete('/promotions/:id', requireAuth, async (req, res) => {
  await prisma.promotion.delete({ where: { id: +req.params.id } });
  res.status(204).end();
});
router.post('/promotions/validate-coupon', async (req, res) => {
  const coupon = await prisma.coupon.findUnique({
    where: { code: (req.body.code || '').toUpperCase() },
  });
  if (!coupon || !coupon.active || coupon.expiresAt < new Date())
    return res.status(400).json({ message: 'Cupom inválido ou expirado.' });
  res.json(coupon);
});

router.get('/reports/dashboard', requireAuth, async (_req, res) => {
  const [products, orders, sales, revenue, lowStock] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.sale.count(),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: 'CANCELADO' } } }),
    prisma.product.count({ where: { stock: { lte: 4 } } }),
  ]);
  res.json({ products, orders, sales, revenue: revenue._sum.total || 0, lowStock });
});
router.get('/reports/sales', requireAuth, async (_req, res) =>
  res.json(await prisma.sale.findMany({ include: { items: true }, orderBy: { createdAt: 'desc' } }))
);
router.get('/reports/products', requireAuth, async (_req, res) =>
  res.json(await prisma.product.findMany({ orderBy: { stock: 'asc' } }))
);
router.get('/reports/customers', requireAuth, async (_req, res) =>
  res.json(await prisma.customer.findMany({ include: { _count: { select: { orders: true } } } }))
);

router.get('/settings', async (_req, res) =>
  res.json(await prisma.storeSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }))
);
router.put('/settings', requireAuth, async (req, res) =>
  res.json(
    await prisma.storeSettings.upsert({
      where: { id: 1 },
      update: req.body,
      create: { id: 1, ...req.body },
    })
  )
);

export default router;
