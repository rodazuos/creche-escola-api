module.exports = (sequelize, DataTypes) => {
  const Kindergarten = sequelize.define(
    "kindergarten",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      cnpj: {
        field: "cnpj",
        type: DataTypes.STRING,
        allowNull: false,
      },
      kindergartenName: {
        field: "kindergarten_name",
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        field: "description",
        type: DataTypes.STRING,
        allowNull: true,
      },
      photo: {
        field: "photo",
        type: DataTypes.STRING,
        allowNull: true,
      },
      instagram: {
        field: "instagram",
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("timezone('utc', now())"),
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: true,
      },
      deletedAt: {
        field: "deleted_at",
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Kindergarten;
};
