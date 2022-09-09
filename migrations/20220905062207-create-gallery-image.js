"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("galleryImages", {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      carId: { type: DataTypes.UUID, references: { key: "id", model: "cars" } },
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
    await queryInterface.dropTable("galleryImages");
  },
};
