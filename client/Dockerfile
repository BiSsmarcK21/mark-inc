# --- Stage 1: base (общая для dev и prod) ---
FROM node:20 AS base
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# --- Stage 2: dev ---
FROM base AS dev
CMD ["npm", "run", "dev"]

# --- Stage 3: build ---
FROM base AS build
RUN npm run build

# --- Stage 4: prod ---
FROM node:20 AS prod
WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]
