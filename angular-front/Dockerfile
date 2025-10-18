FROM node:22

# Dossier de travail
WORKDIR /app

# Copie package.json et package-lock.json avant tout
COPY package*.json ./

# Installe Angular CLI et les dépendances locales
RUN npm install -g @angular/cli@19 \
    && npm install

# Copie le reste du projet
COPY . .

# Expose le port Angular
EXPOSE 4200

# Lance le serveur Angular
CMD ["ng", "serve", "--host", "0.0.0.0"]
