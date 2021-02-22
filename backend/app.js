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

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
  app.use(cors(corsOptions));
//validate

// app.use
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//helmet
//validate
//Gestion image
app.use('/images', express.static(path.join(__dirname, 'images')));

//Routes
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
//app.use('/api/user', adminRoutes)


module.exports = app;