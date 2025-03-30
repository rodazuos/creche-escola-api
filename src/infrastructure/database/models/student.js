module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "student",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      cpf: {
        field: "cpf",
        type: DataTypes.STRING,
        allowNull: false,
      },
      studentName: {
        field: "student_name",
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        field: "photo",
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthdate: {
        field: "birthdate",
        type: DataTypes.DATE,
        allowNull: false,
      },
      entryTime: {
        field: "entry_time",
        type: DataTypes.TIME,
        allowNull: false,
      },
      depertureTime: {
        field: "deperture_time",
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

  return Student;
};
