'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models){
      this.belongsTo(models.category, {foreignKey:"categoryId"})
    }
  }
  shows.init({
    video_id:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    video_title: {
      type: DataTypes.STRING,
      allowNull:false
    },    
    video_src:{
      type: DataTypes.STRING,
      allowNull:false
    },
    thumbnail: {
      type: DataTypes.STRING,
      // allowNull:false
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false
    },
    categoryId:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
   
    // age_group: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'shows',
  });
  return shows;
};