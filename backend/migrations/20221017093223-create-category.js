'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      category_id: {
        type: DataTypes.UUID
      },
      category_name: {
        type: DataTypes.STRING
      },
      category_img:{
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('categories');
  }
};