# Étape 1 : Builder avec TypeScript
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ✅ Générer le client Prisma
RUN npx prisma generate

# ✅ Compiler le TypeScript
RUN npm run build

# Étape 2 : Image de production
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# ✅ Copier le build TypeScript
COPY --from=builder /app/dist ./dist

# ✅ Copier les fichiers Prisma générés nécessaires au runtime
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma

EXPOSE 5000

CMD ["node", "dist/server.js"]
