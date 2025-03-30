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
      idStudentDaily: {
        field: "id_student_daily",
        type: DataTypes.BIGINT,
        references: {
          model: "StudentDaily",
          key: "id",
        },
      },
      idRoutineType: {
        field: "id_routine_type",
        type: DataTypes.BIGINT,
        references: {
          model: "RoutineType",
          key: "id",
        },
      },
      idRoutineTypeDetail: {
        field: "id_routine_type_detail",
        type: DataTypes.BIGINT,
        references: {
          model: "RoutineTypeDetail",
          key: "id",
        },
      },
      startTimeRoutine: {
        field: "start_time_routine",
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTimeRoutine: {
        field: "end_time_routine",
        type: DataTypes.TIME,
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

  return StudentDaily;
};
