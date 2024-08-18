# Utiliser une image de base Node.js version 18
FROM node:18

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Exposer le port sur lequel l'application va écouter
EXPOSE 4000

# Démarrer l'application
CMD ["node", "server.js"]
