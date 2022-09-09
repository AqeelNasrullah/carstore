"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.GalleryImage, { foreignKey: "carId", as: "gallery" });
    }
  }
  Car.init(
    {
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
      price: { type: DataTypes.INTEGER("big"), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      specifications: { type: DataTypes.TEXT("long"), allowNull: false },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};
