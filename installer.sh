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

# install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update && sudo apt install --no-install-recommends yarn

# descargar nvm para usar npm y node latest version
# https://help.dreamhost.com/hc/es/articles/360029083351-Instalar-una-versión-personalizada-de-NVM-y-Node-js

sudo -o- curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

# actualizar .bashrc
source .bashrc

# aplicar cambios
sudo apt install attr 

# para que no se bloquee el script

setfattr -n user.pax.flags -v "mr" $NVM_DIR/nvm.sh

source ~/.bashrc
. ~/.profile

echo nvm version:
nvm --version

# instalamos node, npm
nvm install 16.14.0


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

sudo yarn install

sudo yarn build

cd ..

sudp rm ./backend/build -r

sudo mv ./frontend/build ./backend # move build to backend

sudo rm frontend -r # delete frontend unnecesary folder

sudo docker-compose -f docker-compose-prod.yml up -d