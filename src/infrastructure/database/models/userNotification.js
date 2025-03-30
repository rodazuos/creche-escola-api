module.exports = (sequelize, DataTypes) => {
  const UserNotification = sequelize.define(
    "user_notification",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      idNotification: {
        field: "id_notification",
        type: DataTypes.BIGINT,
        references: {
          model: "Notification",
          key: "id",
        },
      },
      idUser: {
        field: "id_user",
        type: DataTypes.BIGINT,
        references: {
          model: "User",
          key: "id",
        },
      },
      readNotification: {
        field: "read_notification",
        type: DataTypes.BOOLEAN,
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

  return UserNotification;
};
