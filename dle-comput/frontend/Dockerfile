# Usar a imagem oficial do Node.js como base
FROM node:18-alpine

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos do projeto para o diretório de trabalho
COPY . .

# Instalar as dependências
RUN npm install

# Expor a porta em que o aplicativo será executado
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
