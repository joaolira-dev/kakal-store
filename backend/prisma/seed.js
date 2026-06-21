import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const products = [
  [
    'Vestido Floral Encantado',
    'vestido-floral-encantado',
    89.9,
    0,
    18,
    'Meninas',
    true,
    false,
    false,
  ],
  ['Polo Listrada Aventura', 'polo-listrada-aventura', 69.9, 0, 12, 'Meninos', true, false, true],
  [
    'Jardineira Jeans Divertida',
    'jardineira-jeans-divertida',
    99.9,
    84.9,
    7,
    'Meninos',
    true,
    false,
    true,
  ],
  [
    'Camiseta Dino Explorador',
    'camiseta-dino-explorador',
    49.9,
    0,
    4,
    'Meninos',
    true,
    true,
    false,
  ],
  [
    'Bermuda Moletom Conforto',
    'bermuda-moletom-conforto',
    59.9,
    0,
    10,
    'Meninos',
    true,
    false,
    false,
  ],
  ['Vestido Arco-Íris', 'vestido-arco-iris', 94.9, 0, 15, 'Meninas', false, true, false],
  ['Conjunto Natureza', 'conjunto-natureza', 79.9, 0, 9, 'Meninas', false, true, false],
  ['Moletom Ursinho', 'moletom-ursinho', 89.9, 0, 5, 'Bebê', false, true, false],
  ['Jaqueta Jeans', 'jaqueta-jeans', 119.9, 99.9, 2, 'Meninos', false, true, true],
  ['Calça Jogger Rosa', 'calca-jogger-rosa', 59.9, 0, 11, 'Meninas', false, true, false],
];

async function main() {
  const password = await bcrypt.hash('123456', 10);
  await prisma.user.upsert({
    where: { email: 'admin@kakalkids.com.br' },
    update: {},
    create: { name: 'Kakal Admin', email: 'admin@kakalkids.com.br', password },
  });
  const categories = {};
  for (const [name, slug, color, icon] of [
    ['Meninas', 'meninas', '#ffe8ef', 'Heart'],
    ['Meninos', 'meninos', '#e5f7fc', 'Sparkles'],
    ['Bebê', 'bebe', '#f4efff', 'Baby'],
    ['Acessórios', 'acessorios', '#fff4d5', 'Gift'],
  ]) {
    categories[name] = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { name, slug, color, icon },
    });
  }
  for (const [
    name,
    slug,
    price,
    salePrice,
    stock,
    category,
    featured,
    fresh,
    promotion,
  ] of products) {
    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        name,
        slug,
        price,
        salePrice: salePrice || null,
        stock,
        minStock: 4,
        categoryId: categories[category].id,
        featured,
        new: fresh,
        promotion,
        image: 'colecao-produtos.png',
        description:
          'Uma peça confortável, colorida e cheia de carinho para acompanhar as aventuras das crianças.',
      },
    });
  }
  const customer = await prisma.customer.upsert({
    where: { email: 'maria@exemplo.com' },
    update: {},
    create: {
      name: 'Maria Eduarda',
      email: 'maria@exemplo.com',
      phone: '(83) 99999-0000',
      address: 'Rua das Flores, 123 - João Pessoa/PB',
    },
  });
  await prisma.coupon.upsert({
    where: { code: 'KAKAL10' },
    update: {},
    create: { code: 'KAKAL10', discount: 10, expiresAt: new Date('2027-12-31') },
  });
  await prisma.promotion
    .create({
      data: {
        name: 'Semana encantada',
        discount: 30,
        startDate: new Date('2026-01-01'),
        endDate: new Date('2027-01-01'),
      },
    })
    .catch(() => {});
  await prisma.storeSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });
  const existing = await prisma.order.findFirst();
  if (!existing) {
    const product = await prisma.product.findFirst();
    await prisma.order.create({
      data: {
        code: 'KKS1048',
        customerId: customer.id,
        subtotal: 89.9,
        total: 89.9,
        payment: 'PIX',
        status: 'PAGO',
        address: customer.address,
        items: {
          create: [{ productId: product.id, quantity: 1, price: 89.9, size: '6', color: 'Coral' }],
        },
      },
    });
  }
  console.log('🌈 Banco da Kakal Kids Store semeado com carinho!');
}
main().finally(() => prisma.$disconnect());
