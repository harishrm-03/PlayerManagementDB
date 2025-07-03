module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define("Team", {
    TeamID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    TeamName: { type: DataTypes.STRING, allowNull: false },
    Coach: { type: DataTypes.STRING },
    CaptainID: { type: DataTypes.INTEGER },
    LogoURL: { type: DataTypes.STRING, allowNull: true }, // New field for team logo
  },
  {
    timestamps: false // Disable timestamps
  });

  Team.associate = (models) => {
    Team.hasMany(models.Player, { foreignKey: "TeamID" });
    Team.belongsTo(models.Player, { as: "Captain", foreignKey: "CaptainID" });
  };

  return Team;
};
