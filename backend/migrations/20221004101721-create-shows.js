'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('shows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      video_id:{
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
      },
      video_title: {
        type: DataTypes.STRING
      },
      thumbnail: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING
      },
      video_src:{
        type: DataTypes.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      categoryId:{
        type:DataTypes.INTEGER,
        
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('shows');
  }
};