module.exports = (sequelize, DataTypes) => {
  const StudentDaily = sequelize.define(
    "student_daily",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      idStudent: {
        field: "id_student",
        type: DataTypes.BIGINT,
        references: {
          model: "Student",
          key: "id",
        },
      },
      dateDaily: {
        field: "date_daily",
        type: DataTypes.DATE,
        allowNull: false,
      },
      attended: {
        field: "attended",
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

  return StudentDaily;
};
