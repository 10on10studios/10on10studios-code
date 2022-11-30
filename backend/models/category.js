'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.k
     */
    static associate(models) {
      this.hasMany(models.shows,{foreignKey:"categoryId"})
    }
  }
  category.init({
    category_id:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    category_name:{
      type: DataTypes.STRING,
      allowNull:false
    },
    category_img:{
      type: DataTypes.STRING,
      allowNull:false
    },
    
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};