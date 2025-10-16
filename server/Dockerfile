# --- Stage 1: base (общая основа для dev и prod) ---
FROM node:20 AS base
WORKDIR /app

# Копируем package.json и lock файлы
COPY package*.json ./

COPY prisma ./prisma

# Ставим зависимости (включая devDependencies для TS, ESLint, Nodemon и т.д.)
RUN npm install

# Копируем всё остальное (src, prisma, конфиги и т.д.)
COPY . .

# --- Stage 2: development ---
FROM base AS dev
# в dev режиме нам не нужен билд, используем ts-node/nodemon
CMD ["npm", "run", "dev"]

# --- Stage 3: build ---
FROM base AS build
# Компиляция TS → JS
RUN npm run build
# Генерация Prisma client
RUN npx prisma generate

# --- Stage 4: production ---
FROM node:20 AS prod
WORKDIR /app

# Копируем только нужное из build stage (без исходников и dev-зависимостей)
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist

# Открываем порт
EXPOSE 4000

# Запуск собранного JS
CMD ["node", "dist/index.js"]
