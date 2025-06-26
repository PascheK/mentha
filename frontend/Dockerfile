# Étape 1 : Build de l'app
FROM node:20 AS builder

# Créer le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json package-lock.json ./
RUN npm install

# Copier tout le projet et builder
COPY . .
RUN npm run build

# Étape 2 : Image de production
FROM node:20-alpine

# Répertoire de travail
WORKDIR /app

# Installer les dépendances de prod uniquement
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copier les fichiers buildés
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/package.json ./

# Port d'exposition (adapter si autre port)
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"]
