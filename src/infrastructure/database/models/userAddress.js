module.exports = (sequelize, DataTypes) => {
  const UserAddress = sequelize.define(
    "user_address",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      idUser: {
        field: "id_user",
        type: DataTypes.BIGINT,
        references: {
          model: "Users",
          key: "id",
        },
      },
      address: {
        field: "address",
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressNumber: {
        field: "address_number",
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressComplement: {
        field: "address_complement",
        type: DataTypes.STRING,
        allowNull: true,
      },
      zipcode: {
        field: "zipcode",
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        field: "city",
        type: DataTypes.STRING,
        allowNull: false,
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

  return UserAddress;
};
