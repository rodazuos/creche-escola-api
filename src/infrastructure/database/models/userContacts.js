module.exports = (sequelize, DataTypes) => {
  const UserContacts = sequelize.define(
    "user_contacts",
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
      email: {
        field: "email",
        type: DataTypes.STRING,
        allowNull: false,
      },
      housePhoneNumber: {
        field: "house_phone_number",
        type: DataTypes.STRING,
        allowNull: true,
      },
      personalPhoneNumber: {
        field: "personal_phone_number",
        type: DataTypes.STRING,
        allowNull: false,
      },
      commercialPhoneNumber: {
        field: "commercial_phone_number",
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactDescription: {
        field: "contact_description",
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

  return UserContacts;
};
