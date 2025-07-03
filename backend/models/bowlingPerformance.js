module.exports = (sequelize, DataTypes) => {
  const BowlingPerformance = sequelize.define("BowlingPerformance", {
    PlayerID: { 
      type: DataTypes.INTEGER, 
      primaryKey: true 
    },
    MatchID: { 
      type: DataTypes.INTEGER, 
      allowNull: true, 
      references: { model: "Matches", key: "MatchID" }, 
      onDelete: "CASCADE", 
      onUpdate: "CASCADE" 
    },
    MatchesPlayed: DataTypes.INTEGER,
    Innings: DataTypes.INTEGER,
    RunsConceded: DataTypes.INTEGER,
    Wickets: DataTypes.INTEGER,
    BestBowling: DataTypes.STRING,
    Economy: DataTypes.FLOAT,
    BowlingStrikeRate: DataTypes.FLOAT,
  },
  {
    timestamps: false // Disable timestamps
  });

  BowlingPerformance.associate = (models) => {
    BowlingPerformance.belongsTo(models.Player, { foreignKey: "PlayerID", onDelete: "CASCADE", onUpdate: "CASCADE" });
    BowlingPerformance.belongsTo(models.Match, { foreignKey: "MatchID", onDelete: "CASCADE", onUpdate: "CASCADE" });
  };

  return BowlingPerformance;
};
