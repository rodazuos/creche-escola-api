module.exports = (sequelize, DataTypes) => {
  const Calendar = sequelize.define(
    "calendar",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      eventDate: {
        field: "event_date",
        type: DataTypes.DATE,
        allowNull: false,
      },
      title: {
        field: "title",
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        field: "description",
        type: DataTypes.STRING,
        allowNull: true,
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

  return Calendar;
};
