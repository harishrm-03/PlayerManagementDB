module.exports = (sequelize, DataTypes) => {
  const WicketKeepingPerformance = sequelize.define(
    "WicketKeepingPerformance",
    {
      PlayerID: { type: DataTypes.INTEGER, primaryKey: true },
      MatchesPlayed: { type: DataTypes.INTEGER },
      Stumpings: { type: DataTypes.INTEGER },
      Catches: { type: DataTypes.INTEGER },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  WicketKeepingPerformance.associate = (models) => {
    WicketKeepingPerformance.belongsTo(models.Player, { foreignKey: "PlayerID", onDelete: "CASCADE", onUpdate: "CASCADE" });
  };

  return WicketKeepingPerformance;
};