require('dotenv').config({ path: './config/.env' });
//Principale
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
//const cors = require("./middleware/cors")
const cors = require('cors');

//Routes
const db = require('./config/dbSql')
const userRoutes = require('./routes/user.routes.js');
const postRoutes = require('./routes/post.routes.js');
const commentRoutes = require('./routes/comment.routes');
//const adminRoutes = require ('./routes/admin.routes')


//Partie sequelize
db.sequelize.sync({/*force:true*/ }).then(() => {
  console.log("database connected");
}); //synchronisation de la BDD et remise à 0

//Securité
/* const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': 'Content-Type',
  'Access-Control-Allow-Headers': 'x-access-token',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions)); */

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//validate

// app.use
app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

//helmet
//validate
//Gestion image
//Routes
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);


module.exports = app;