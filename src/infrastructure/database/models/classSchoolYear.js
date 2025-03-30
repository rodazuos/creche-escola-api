module.exports = (sequelize, DataTypes) => {
  const ClassSchoolYear = sequelize.define(
    "class_school_year",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      schoolYear: {
        field: "school_year",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idStudentsClass: {
        field: "id_students_class",
        type: DataTypes.BIGINT,
        references: {
          model: "StudentsClass",
          key: "id",
        },
      },
      startTime: {
        field: "start_time",
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        field: "end_time",
        type: DataTypes.TIME,
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

  return ClassSchoolYear;
};
