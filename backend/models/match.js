module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define(
    "Match",
    {
      MatchID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      Date: { type: DataTypes.DATE },
      Team1ID: { type: DataTypes.INTEGER },
      Team2ID: { type: DataTypes.INTEGER },
      WinnerTeamID: { type: DataTypes.INTEGER },
      Venue: { type: DataTypes.STRING }, // New field for venue
      MatchType: { type: DataTypes.STRING }, // New field for match type (e.g., T20, ODI)
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  Match.associate = (models) => {
    Match.belongsTo(models.Team, { as: "Team1", foreignKey: "Team1ID" });
    Match.belongsTo(models.Team, { as: "Team2", foreignKey: "Team2ID" });
    Match.belongsTo(models.Team, { as: "Winner", foreignKey: "WinnerTeamID" });
  };

  return Match;
};
