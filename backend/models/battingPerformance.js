module.exports = (sequelize, DataTypes) => {
  const BattingPerformance = sequelize.define("BattingPerformance", {
    PlayerID: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      references: { model: "Players", key: "PlayerID" }, 
      onDelete: "CASCADE", 
      onUpdate: "CASCADE" 
    },
    MatchesPlayed: DataTypes.INTEGER,
    Innings: DataTypes.INTEGER,
    Runs: DataTypes.INTEGER,
    HighestScore: DataTypes.INTEGER,
    BattingAverage: DataTypes.FLOAT,
    StrikeRate: DataTypes.FLOAT,
    Fifties: DataTypes.INTEGER,
    Hundreds: DataTypes.INTEGER,
  },
  {
    timestamps: false // Disable timestamps
  });

  BattingPerformance.associate = (models) => {
    BattingPerformance.belongsTo(models.Player, { foreignKey: "PlayerID", onDelete: "CASCADE", onUpdate: "CASCADE" });
  };

  return BattingPerformance;
};
