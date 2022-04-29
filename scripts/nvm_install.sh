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
