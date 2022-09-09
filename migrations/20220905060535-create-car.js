"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("cars", {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
      },
      coverImage: { type: DataTypes.STRING, allowNull: false },
      brand: { type: DataTypes.STRING, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      model: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
      year: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.INTEGER(24), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      specifications: { type: DataTypes.TEXT("long"), allowNull: false },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("cars");
  },
};
