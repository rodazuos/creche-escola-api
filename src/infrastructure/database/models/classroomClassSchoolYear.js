module.exports = (sequelize, DataTypes) => {
  const ClassroomClassSchoolYear = sequelize.define(
    "classroom_class_school_year",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      idClassroom: {
        field: "id_classroom",
        type: DataTypes.BIGINT,
        references: {
          model: "Classroom",
          key: "id",
        },
      },
      idClassSchoolYear: {
        field: "id_class_school_year",
        type: DataTypes.BIGINT,
        references: {
          model: "ClassSchoolYear",
          key: "id",
        },
      },
      weekday: {
        field: "weekday",
        type: DataTypes.STRING,
        allowNull: false,
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

  return ClassroomClassSchoolYear;
};
