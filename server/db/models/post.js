'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    
    static associate( {User} ) {
      this.belongsTo(User, {foreignKey: 'userId'});
    }
  }
  Post.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    comment: DataTypes.STRING,
    money: DataTypes.STRING,
    country: DataTypes.STRING,
    time: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};