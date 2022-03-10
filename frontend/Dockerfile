# instalamos imagen de node
FROM node:16.14.0

# definimos la carpeta de trabajo
WORKDIR /frontend

# instalamos las dependencias
COPY package.json ./
COPY package-lock.json ./

RUN yarn

# copiamos archivos exceptos los del .dockerignore
COPY . .

# definimos puertos
ENV PORT = 3000
EXPOSE 3000

# corremos la aplicacion
CMD ["yarn", "start"]



