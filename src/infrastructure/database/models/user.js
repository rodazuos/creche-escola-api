module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      idKindergarten: {
        field: "id_kindergarten",
        type: DataTypes.INTEGER,
        references: {
          model: "Kindergarten",
          key: "id",
        },
      },
      idTypeAccount: {
        field: "id_type_account",
        type: DataTypes.INTEGER,
        references: {
          model: "TypeAccount",
          key: "id",
        },
      },
      cpf: {
        field: "cpf",
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        field: "user_name",
        type: DataTypes.STRING,
        allowNull: false,
      },
      userPassword: {
        field: "user_password",
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        field: "photo",
        type: DataTypes.STRING,
        allowNull: true,
      },
      accessSystem: {
        field: "access_system",
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

  return Users;
};
