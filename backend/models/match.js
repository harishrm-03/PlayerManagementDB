module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define(
    "Match",
    {
      MatchID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      Date: { type: DataTypes.DATE },
      Team1ID: { type: DataTypes.INTEGER },
      Team2ID: { type: DataTypes.INTEGER },
      WinnerTeamID: { type: DataTypes.INTEGER },
      Venue: { type: DataTypes.STRING }, // Field for venue
      MatchType: { type: DataTypes.STRING }, // Field for match type (e.g., T20, ODI)
      BestBowlerID: { type: DataTypes.INTEGER }, // New field for Best Bowler
      BestBatsmanID: { type: DataTypes.INTEGER }, // New field for Best Batsman
      PlayerOfTheMatchID: { type: DataTypes.INTEGER }, // New field for Player of the Match
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  Match.associate = (models) => {
    Match.belongsTo(models.Team, { as: "Team1", foreignKey: "Team1ID" });
    Match.belongsTo(models.Team, { as: "Team2", foreignKey: "Team2ID" });
    Match.belongsTo(models.Team, { as: "Winner", foreignKey: "WinnerTeamID" });
    Match.belongsTo(models.Player, { as: "BestBowler", foreignKey: "BestBowlerID" });
    Match.belongsTo(models.Player, { as: "BestBatsman", foreignKey: "BestBatsmanID" });
    Match.belongsTo(models.Player, { as: "PlayerOfTheMatch", foreignKey: "PlayerOfTheMatchID" });
  };

  return Match;
};
