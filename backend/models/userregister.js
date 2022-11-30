'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userRegister extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userRegister.init({
    email:{
      type: DataTypes.STRING,
      allowNull:false
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false
    },
    startDate:{
      type: DataTypes.STRING,
      allowNull:true
    },
    otp:{
      type: DataTypes.STRING,
      allowNull:true
    },
  }, {
    sequelize,
    modelName: 'userRegister',
    tableName:"userRegisters"
  });
  return userRegister;
};