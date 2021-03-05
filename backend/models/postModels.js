module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      userId: { type: Sequelize.INTEGER, allowNull: false},
      title: { type: Sequelize.STRING(255), allowNull: false },
      content: { type: Sequelize.TEXT, allowNull: false },
      picture: { type: Sequelize.STRING, required: false}
   });

    return Post;
  };
  