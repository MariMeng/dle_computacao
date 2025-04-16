# Usa a imagem oficial do Node.js como base
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependências para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação para o container
COPY . .

# Expondo a porta em que o backend será executado
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
