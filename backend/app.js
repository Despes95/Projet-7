require('dotenv').config({ path: './config/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

//Routes
const db = require('./config/dbSql')
const userRoutes = require('./routes/user.routes.js');
const postRoutes = require('./routes/post.routes.js');
const commentRoutes = require('./routes/comment.routes');


//Partie sequelize
db.sequelize.sync({/*force:true*/ }).then(() => {
  console.log("database connected");
}); //synchronisation de la BDD et remise à 0


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(bodyParser.json());
app.use(helmet());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);


module.exports = app;