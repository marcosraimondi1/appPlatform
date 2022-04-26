# C O N F I G U R A C I O N E S __ D E __ P R O Y E C T O (clonar repo, build front, env variables, run docker-compose)

sudo docker-compose -f docker-compose-prod.yml down

sudo git pull

sudo rm -r ./backend/ffmpeg


# install dependencies and build project

cd frontend

sudo npm install --no-audit --no-fund --no-optional

sudo npm run build

cd ..

sudo rm ./backend/build -r

sudo mv ./frontend/build ./backend # move build to backend

sudo mkdir backend/data

sudo mkdir backend/screens

echo -------------------------- starting docker -------------------------------------

sudo docker-compose -f docker-compose-prod.yml build

sudo docker-compose -f docker-compose-prod.yml up -d