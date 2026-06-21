-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL, "email" TEXT NOT NULL, "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN', "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL, "slug" TEXT NOT NULL, "color" TEXT NOT NULL DEFAULT '#ffe8ef',
    "icon" TEXT NOT NULL DEFAULT 'Sparkles', "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "name" TEXT NOT NULL, "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '', "price" REAL NOT NULL, "salePrice" REAL,
    "stock" INTEGER NOT NULL DEFAULT 0, "minStock" INTEGER NOT NULL DEFAULT 3,
    "sizes" TEXT NOT NULL DEFAULT 'P,M,G', "colors" TEXT NOT NULL DEFAULT 'Colorido',
    "gender" TEXT NOT NULL DEFAULT 'Unissex', "image" TEXT NOT NULL DEFAULT '',
    "active" BOOLEAN NOT NULL DEFAULT true, "featured" BOOLEAN NOT NULL DEFAULT false,
    "new" BOOLEAN NOT NULL DEFAULT false, "promotion" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "name" TEXT NOT NULL, "email" TEXT,
    "phone" TEXT NOT NULL, "cpf" TEXT, "address" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "code" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE', "subtotal" REAL NOT NULL,
    "discount" REAL NOT NULL DEFAULT 0, "shipping" REAL NOT NULL DEFAULT 0, "total" REAL NOT NULL,
    "payment" TEXT NOT NULL DEFAULT 'PIX', "address" TEXT NOT NULL DEFAULT '', "customerId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE "OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "quantity" INTEGER NOT NULL, "price" REAL NOT NULL,
    "size" TEXT NOT NULL DEFAULT '', "color" TEXT NOT NULL DEFAULT '', "productId" INTEGER NOT NULL, "orderId" INTEGER NOT NULL,
    CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE "Sale" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "code" TEXT NOT NULL, "total" REAL NOT NULL,
    "discount" REAL NOT NULL DEFAULT 0, "payment" TEXT NOT NULL, "customerId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Sale_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE "SaleItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "quantity" INTEGER NOT NULL, "price" REAL NOT NULL,
    "productId" INTEGER NOT NULL, "saleId" INTEGER NOT NULL,
    CONSTRAINT "SaleItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SaleItem_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE "StockMovement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "type" TEXT NOT NULL, "quantity" INTEGER NOT NULL,
    "note" TEXT NOT NULL DEFAULT '', "productId" INTEGER NOT NULL, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StockMovement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE "Promotion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "name" TEXT NOT NULL, "discount" REAL NOT NULL,
    "startDate" DATETIME NOT NULL, "endDate" DATETIME NOT NULL, "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "Coupon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "code" TEXT NOT NULL, "discount" REAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true, "expiresAt" DATETIME NOT NULL, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "StoreSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1, "name" TEXT NOT NULL DEFAULT 'Kakal Kids Store',
    "whatsapp" TEXT NOT NULL DEFAULT '5583999999999', "instagram" TEXT NOT NULL DEFAULT '@kakalkidsstore',
    "email" TEXT NOT NULL DEFAULT 'atendimento@kakalkids.com.br', "address" TEXT NOT NULL DEFAULT 'João Pessoa - PB',
    "primaryColor" TEXT NOT NULL DEFAULT '#ff3f6c', "whatsappMessage" TEXT NOT NULL DEFAULT 'Olá! Como podemos ajudar?',
    "shipping" REAL NOT NULL DEFAULT 15, "exchangePolicy" TEXT NOT NULL DEFAULT 'Trocas em até 7 dias.',
    "homeText" TEXT NOT NULL DEFAULT 'Estilo, conforto e diversão para todas as aventuras!', "updatedAt" DATETIME NOT NULL
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
CREATE UNIQUE INDEX "Order_code_key" ON "Order"("code");
CREATE UNIQUE INDEX "Sale_code_key" ON "Sale"("code");
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");
