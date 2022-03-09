# LUEGO DE EJECUTAR reqs.sh y REINICIAR CONSOLA

sudo apt update

nvm install 16.14.0

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