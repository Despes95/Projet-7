const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs : 10 * 60 * 1000, // 10 minutes 
    max: 10, // limit each IP to 10 requests per windowMs 
      handler: function(req, res ) {
        res.status(500).send({ message: "Vous avez atteint le maximun d'essais, veuillez retentez dans 10 minutes" });
      },
});

module.exports = limiter;