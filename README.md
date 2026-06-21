# Kakal Kids Store

Loja infantil completa com vitrine, carrinho, checkout e painel administrativo. A interface foi criada com a identidade visual Kakal: tons pastel, rosa vibrante, detalhes divertidos e a personagem original da marca.

## Tecnologias

- Front-end: React + Vite + React Router + Axios + Lucide + Recharts
- Back-end: Node.js + Express + Prisma + JWT + Multer
- Banco local: SQLite, preparado para futura troca para PostgreSQL

Requisito: Node.js 18 ou superior.

## Rodar o projeto

Em dois terminais:

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

- Loja: http://localhost:5173
- API: http://localhost:3333
- Saúde da API: http://localhost:3333/api/health

## Acesso administrativo

- E-mail: `admin@kakalkids.com.br`
- Senha: `123456`

## Comandos úteis

```bash
# backend
npm run prisma:generate
npm run prisma:migrate
npm run seed

# frontend
npm run build
npm run format
npm run format:check
```

## Trocar para PostgreSQL depois

1. Altere `provider = "sqlite"` para `provider = "postgresql"` em `backend/prisma/schema.prisma`.
2. Defina `DATABASE_URL` com a URL do PostgreSQL no `.env`.
3. Execute `npx prisma migrate dev` para criar as tabelas no novo banco.

## Assets

Os assets da marca estão em `frontend/src/assets/`. A personagem Kakal original foi mantida em `boneca-kakal.png` e `logo-kakal.png`; as imagens fotográficas de hero e produtos foram geradas para complementar a identidade visual.
