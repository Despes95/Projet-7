require('dotenv').config({ path: './config/.env' });
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+01:00',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Importation des différents fichiers models
db.user = require('../models/userModels')(sequelize, Sequelize);
db.post = require('../models/postModels')(sequelize, Sequelize);
db.comment = require('../models/commentModels')(sequelize, Sequelize);

//L'utilisateur est l'auteur de plusieurs posts
db.user.hasMany(db.post, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

//L'utilisateur est l'auteur de plusieurs commentaires
db.user.hasMany(db.comment, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

//Un post peut avoir plusieurs commentaires
db.post.hasMany(db.comment, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

db.post.belongsTo(db.user, { foreignKey: 'userId' }); //Un post n'a qu'un utilisateur
db.comment.belongsTo(db.user, { foreignKey: 'userId' }); //Un commentaire n'a qu'un utilisateur
db.comment.belongsTo(db.post, { foreignKey: 'postId' }); //Un commentaire n'a qu'un post


sequelize.authenticate()
  .then(() => {
    console.log('.......');
    console.log('.......');
    console.log('La connexion à la base de donnée a été établie avec succès');
    console.log('.......');
    console.log('.......');

  })
  .catch(err => { console.log(err, 'La connexion à la base de donnée a échoué'); });

module.exports = db;