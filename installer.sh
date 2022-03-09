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

# > para instalar nvm y usar node y npm actualizados

sudo curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

# reiniciar la consola para que se efectuen los cambios

nvm install 16.14.0

npm install yarn

sudo git clone https://github.com/marcosraimondi1/appPlatform.git webserver

cd webserver

sudo rm frontend -> delete frontend unnecesary folder

configurar archivo .env

sudo docker-compose -f docker-compose-prod.yml up -d