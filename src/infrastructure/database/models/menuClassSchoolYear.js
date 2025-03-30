module.exports = (sequelize, DataTypes) => {
  const MenuClassSchoolYear = sequelize.define(
    "menu_class_school_year",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      idMenuClass: {
        field: "id_menu_class",
        type: DataTypes.BIGINT,
        references: {
          model: "MenuClass",
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
      dateMenu: {
        field: "date_menu",
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

  return MenuClassSchoolYear;
};
