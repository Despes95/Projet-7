const jwt = require('jsonwebtoken');

//Cryptage du token
require('dotenv').config()

//Sécurisation des données utilisateurs avec un token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    const isAdmin= decodedToken.isAdmin;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable";
    } else {
      req.userId = userId
      req.isAdmin = isAdmin
      next();
    }
  } catch (error) {
    res.status(401).json({error: error || "requêtes non authentifiée !"});
  }
}; 

