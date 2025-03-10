# Étape 1 : Utilisation de l'image Node.js
FROM node:18-alpine

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste du projet dans le conteneur
COPY . .

# Étape 6 : Exposer le port de l'application
EXPOSE 5000

# Étape 7 : Commande pour démarrer l'application en mode dev avec nodemon
CMD ["npm", "run", "dev"]
