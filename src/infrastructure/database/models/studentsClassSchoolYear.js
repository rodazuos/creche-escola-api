module.exports = (sequelize, DataTypes) => {
  const StudentsClassSchoolYear = sequelize.define(
    "students_class_school_year",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      idClassSchoolYear: {
        field: "id_class_school_year",
        type: DataTypes.BIGINT,
        references: {
          model: "ClassSchoolYear",
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

  return StudentsClassSchoolYear;
};
