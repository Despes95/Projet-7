# Procedure d'instalation 

## 1  Github
Clonez mon repo afin d'obtenir les deux dossier (frontend et backend)


## 2  Fichier .Env
 Mettre le fichier P7_03(backend).env dans le dossier backend/config et le renommer en .env
 mettre le fichier P7_03(frontend).env a la racine du dossier frontend


## 3 Renseignez les valeurs
Remplacez les guillement par les valeur fournis via les fichiers P7_03(backend).env et P7_03(frontend).env

PORT=""
CLIENT_URL=""
TOKEN=""
DB_HOST=""
DB_USER=""
DB_PASS=""
DB_DATABASE=""
DB_DIALECT=""

## 4 Ajout de la database
Ajouter la database via un editeur mySql

## 5 Admin
Pour mettre un user en admin, mettre 1 dans la colonne isAdmin via un editeur sql (par ex Heidisql)

## 6 Installation
Et enfin, faite un npm i dans le dossier backend, et un npm i dans le fichier frontend
et ensuite un npm start dans le dossier backend et frontend


