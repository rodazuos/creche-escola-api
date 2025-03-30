module.exports = (sequelize, DataTypes) => {
  const RoutineTypeDetail = sequelize.define(
    "routine_type_detail",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      idRoutineType: {
        field: "id_routine_type",
        type: DataTypes.BIGINT,
        references: {
          model: "RoutineType",
          key: "id",
        },
      },
      title: {
        field: "title",
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

  return RoutineTypeDetail;
};
