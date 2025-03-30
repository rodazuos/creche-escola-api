module.exports = (sequelize, DataTypes) => {
  const StudentDailyMenu = sequelize.define(
    "student_daily_menu",
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
      idMenuClassSchoolYear: {
        field: "id_menu_class_school_year",
        type: DataTypes.BIGINT,
        references: {
          model: "MenuClassSchoolYear",
          key: "id",
        },
      },
      idConsumedTypeMenu: {
        field: "id_consumed_type_menu",
        type: DataTypes.BIGINT,
        references: {
          model: "ConsumedTypeMenu",
          key: "id",
        },
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

  return StudentDailyMenu;
};
