# R E Q U R I M I E N T O S  (docker, yarn, nvm, npm, node, git)

sudo apt update

# > instalar docker

wget https://get.docker.com/    # descargar instalador docker

mv index.html install_docker.sh # cambiar nombre archivo

chmod 777 install_docker.sh  # otorga al archivo acceso total

./install_docker.sh   # ejecutar instalador

sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

sudo rm install_docker.sh # eliminar instalador

sudo apt install git

# descargar nvm para usar version actualizada de node y npm
# https://help.dreamhost.com/hc/es/articles/360029083351-Instalar-una-versión-personalizada-de-NVM-y-Node-js

sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

source .bashrc

setfattr -n user.pax.flags -v "mr" .nvm/nvm.sh

sudo echo "source ~/.bashrc" >> .profile

. ~/.profile

source .bashrc

echo nvm version:
nvm --version

# instalamos node, npm
nvm install 16.13.2

echo npm, node versions:
npm --version
node --version


# C O N F I G U R A C I O N E S __ D E __ P R O Y E C T O (clonar repo, build front, env variables, run docker-compose)

sudo git clone https://github.com/marcosraimondi1/appPlatform.git webserver

sudo rm -r ./webserver/backend/ffmpeg

cd webserver

# configurar archivo .env

echo SETTING ENVIRONMENT VARIABLES
read -p "NODE_ENV= " NODE_ENV
read -p "PORT= " PORT
read -p "INSTA_USERNAME= " INSTA_USERNAME
read -p "INSTA_PASSWORD= " INSTA_PASSWORD
read -p "SPOT_CLIENT_ID= " SPOT_CLIENT_ID
read -p "SPOT_CLIENT_SECRET= " SPOT_CLIENT_SECRET
read -p "SPOT_REDIRECT_URI= " SPOT_REDIRECT_URI
read -p "BASE_URL= " BASE_URL
read -p "GAPI_KEY= " GAPI_KEY
read -p "REACT_APP_API_BASE_URL= " REACT_APP_API_BASE_URL
echo ALL SET UP

cat > ./backend/.env <<- EOM
NODE_ENV=$NODE_ENV
PORT=$PORT
INSTA_USERNAME=$INSTA_USERNAME
INSTA_PASSWORD=$INSTA_PASSWORD
SPOT_CLIENT_ID=$SPOT_CLIENT_ID
SPOT_CLIENT_SECRET=$SPOT_CLIENT_SECRET
SPOT_REDIRECT_URI=$SPOT_REDIRECT_URI
BASE_URL=$BASE_URL
GAPI_KEY=$GAPI_KEY
REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
EOM

cat > ./frontend/.env <<- EOM
REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
EOM

# install dependencies and build project

cd frontend

sudo npm install

sudo npm build

cd ..

sudo rm ./backend/build -r

sudo mv ./frontend/build ./backend # move build to backend

sudo docker-compose -f docker-compose-prod.yml up -d