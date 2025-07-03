module.exports = (sequelize, DataTypes) => {
    const BowlingPerformance = sequelize.define("BowlingPerformance", {
      PlayerID: { type: DataTypes.INTEGER, primaryKey: true },
      MatchesPlayed: { type: DataTypes.INTEGER },
      Innings: { type: DataTypes.INTEGER },
      RunsConceded: { type: DataTypes.INTEGER },
      Wickets: { type: DataTypes.INTEGER },
      BestBowling: { type: DataTypes.STRING },
      Economy: { type: DataTypes.FLOAT },
      BowlingStrikeRate: { type: DataTypes.FLOAT }
    },
    {
      timestamps: false // Disable timestamps
    });
  
    BowlingPerformance.associate = (models) => {
      BowlingPerformance.belongsTo(models.Player, { foreignKey: "PlayerID", onDelete: "CASCADE", onUpdate: "CASCADE" });
    };
  
    return BowlingPerformance;
  };
