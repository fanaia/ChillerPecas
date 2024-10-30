# Use a imagem base do Node.js
FROM node:20

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código da aplicação para o contêiner
COPY . .

# Exponha a porta que a aplicação vai usar
EXPOSE 3010

# Comando para iniciar a aplicação
# CMD ["npm", "start"]
