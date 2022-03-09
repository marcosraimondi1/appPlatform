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

sudo git clone https://github.com/marcosraimondi1/appPlatform.git webserver

cd webserver

sudo rm frontend -> delete frontend unnecesary folder

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

sudo docker-compose -f docker-compose-prod.yml up -d