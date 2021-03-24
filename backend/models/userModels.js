module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      pseudo: {type: Sequelize.STRING(50), allowNull: false},
      email: {type: Sequelize.STRING(255), allowNull: false, unique: true},
      password: {type: Sequelize.STRING, allowNull: false},
      isAdmin: {type: Sequelize.BOOLEAN, defaultValue:false},
    });
    
    return User;
  }; 
  
