# instalamos imagen de node
FROM node:16.14.0

# definimos la carpeta de trabajo
WORKDIR /backend

# puppeteer dependencies
RUN apt-get update \
    && apt-get install -y \
    fonts-liberation \
    gconf-service \
    libappindicator1 \
    libasound2 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libfontconfig1 \
    libgbm-dev \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libicu-dev \
    libjpeg-dev \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libpng-dev \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    xdg-utils

# install ffmpeg package
RUN apt install ffmpeg -y

# instalamos las dependencias
COPY package.json ./
COPY package-lock.json ./

RUN yarn

# make Puppeteer’s bundled Chromium binary properly executable
RUN chmod -R o+rwx ./node_modules/puppeteer/.local-chromium

# copiamos archivos exceptos los del .dockerignore
COPY . .

# definimos puertos
ENV PORT = 5000
EXPOSE 5000

# corremos la aplicacion
CMD ["yarn", "start"]



