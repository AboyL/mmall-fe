!/bin/bash

#mmall shell 
#entrance
entrance=/root/L/developer/mmall
#out
out=/root/L/project/mmall/dist

#cd dir
echo -e "\033[36m ==================cd entrance================== \033[0m"
cd $entrance

#clear dist
echo -e "\033[36m ==================clear git==================== \033[0m"
if [ -d "./dist" ]
        then
        rm -rf dist
else
        echo -e  "\033[36m =========dist not found \033[0m"
fi

#git pull
echo -e "\033[36m =========git pull========== \033[0m"
git pull git@github.com:AboyL/mmall-fe.git

echo -e "\033[36m ========= yarn ========== \033[0m"

# install
yarn

echo -e "\033[36m ========= yarn dist ========== \033[0m"
#run 
yarn dist

#if dist is a dir mv it to out
if [ -d "./dist" ]
        then
        echo "\033[36m ===========================dist is dir=================== \033[0m"
#mv dist
        echo "\033[36m ==================cp dist to out============= \033[0m"
        cp -R ./dist $out
fi