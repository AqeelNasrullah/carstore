"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GalleryImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Car, { foreignKey: "carId", as: "car" });
    }

    toJSON() {
      return { ...this.get(), carId: undefined };
    }
  }
  GalleryImage.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      carId: { type: DataTypes.UUID, references: { key: "id", model: "cars" } },
    },
    {
      sequelize,
      modelName: "GalleryImage",
    }
  );
  return GalleryImage;
};
