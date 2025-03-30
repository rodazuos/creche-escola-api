module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "notification",
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
          model: "User",
          key: "id",
        },
      },
      notificationDate: {
        field: "notification_date",
        type: DataTypes.DATE,
        allowNull: false,
      },
      title: {
        field: "title",
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        field: "description",
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

  return Notification;
};
