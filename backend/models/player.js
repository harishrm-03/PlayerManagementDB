// filepath: d:\Projects\Player Management System\backend\models\player.js
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define("Player", {
    PlayerID: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    Name: { type: DataTypes.STRING, allowNull: false },
    Age: { type: DataTypes.INTEGER, allowNull: false },
    Role: { type: DataTypes.STRING, allowNull: false },
    TeamID: { type: DataTypes.INTEGER, allowNull: false },
    TotalMatches: DataTypes.INTEGER,
    Wins: DataTypes.INTEGER,
    Losses: DataTypes.INTEGER,
    PhotoURL: { type: DataTypes.STRING, allowNull: true }, // New field for player photo
    Bio: { type: DataTypes.TEXT, allowNull: true }, // New field for player bio
  },
  {
    timestamps: false // Disable timestamps
  });

  Player.associate = (models) => {
    Player.belongsTo(models.Team, { foreignKey: "TeamID", onDelete: "CASCADE", onUpdate: "CASCADE" });
    Player.hasOne(models.CaptaincyPerformance, { foreignKey: "PlayerID", onDelete: "CASCADE", onUpdate: "CASCADE" });
    Player.hasOne(models.BattingPerformance, { foreignKey: "PlayerID", onDelete: "CASCADE", onUpdate: "CASCADE" });
    Player.hasOne(models.BowlingPerformance, { foreignKey: "PlayerID", onDelete: "CASCADE", onUpdate: "CASCADE" });
    Player.hasOne(models.FieldingPerformance, { foreignKey: "PlayerID", onDelete: "CASCADE", onUpdate: "CASCADE" });
    Player.hasOne(models.WicketKeepingPerformance, { foreignKey: "PlayerID", onDelete: "CASCADE", onUpdate: "CASCADE" });
    Player.hasMany(models.Achievements, { foreignKey: "PlayerID", onDelete: "CASCADE", onUpdate: "CASCADE" });
  };

  return Player;
};