module.exports = (sequelize, DataTypes) => {
  const UserStudent = sequelize.define(
    "user_student",
    {
      idUser: {
        field: "id_user",
        type: DataTypes.BIGINT,
        references: {
          model: "Users",
          key: "id",
        },
      },
      idStudent: {
        field: "id_student",
        type: DataTypes.BIGINT,
        references: {
          model: "Student",
          key: "id",
        },
      },
      canPickUp: {
        field: "can_pick_up",
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      receiveNotification: {
        field: "receive_notification",
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

  return UserStudent;
};
