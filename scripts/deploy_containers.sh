echo -------------------------- starting docker -------------------------------------
cd ..

sudo docker-compose -f docker-compose-prod.yml build

sudo docker-compose -f docker-compose-prod.yml up -d