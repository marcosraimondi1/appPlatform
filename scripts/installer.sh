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

# instalamos node y npm

wget https://nodejs.org/dist/v16.14.0/node-v16.14.0-linux-x64.tar.xz

sudo apt update

sudo apt install xz-utils

sudo tar -xvf node-v16.14.0-linux-x64.tar.xz # extract tar file

sudo rm node-v16.14.0-linux-x64.tar.xz # remove tar file

sudo cp -r node-v16.14.0-linux-x64/{bin,include,lib,share} /usr/

sudo rm -r node-v16.14.0-linux-x64

echo -------------------------- versions ------------------------------------
sudo node -v
sudo npm -v
echo -------------------------- versions ------------------------------------


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
read -p "REACT_APP_API_BASE_URL= " REACT_APP_API_BASE_URL
read -p "GAPI_KEY= " GAPI_KEY
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

sudo npm run build

cd ..

sudo rm ./backend/build -r

sudo mv ./frontend/build ./backend # move build to backend

sudo mkdir backend/data

sudo mkdir backend/screens

echo -------------------------- starting docker -------------------------------------

sudo docker-compose -f docker-compose-prod.yml build

sudo docker-compose -f docker-compose-prod.yml up -d