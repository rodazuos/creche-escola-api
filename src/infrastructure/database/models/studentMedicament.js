module.exports = (sequelize, DataTypes) => {
  const StudentMedicament = sequelize.define(
    "student_medicament",
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
      idStudent: {
        field: "id_student",
        type: DataTypes.BIGINT,
        references: {
          model: "Student",
          key: "id",
        },
      },
      medicament: {
        field: "medicament",
        type: DataTypes.STRING,
        allowNull: false,
      },
      dosage: {
        field: "dosage",
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        field: "description",
        type: DataTypes.STRING,
        allowNull: false,
      },
      startTime: {
        field: "start_time",
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        field: "end_time",
        type: DataTypes.DATE,
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

  return StudentMedicament;
};
