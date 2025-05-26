FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências (prod + dev, já que TS e Vite precisam)
RUN npm install

# Copie todo o código para dentro do container
COPY . .

# Compile o TypeScript (opcional para Vite, que faz build próprio, mas ok)
RUN npx tsc

# Exponha a porta que o Vite usa por padrão
EXPOSE 5173

# Comando para rodar o servidor de desenvolvimento do Vite
CMD ["npm", "run", "dev"]
