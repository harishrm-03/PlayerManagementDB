module.exports = (sequelize, DataTypes) => {
  const Achievements = sequelize.define(
    "Achievements",
    {
      AchievementID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      PlayerID: { type: DataTypes.INTEGER },
      Award: { type: DataTypes.STRING(100) },
      Date: { type: DataTypes.DATE },
      Category: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "Individual" }, // New field
      Badge: { type: DataTypes.STRING(20), allowNull: true }, // New field for badge (e.g., "Gold", "Silver", "Bronze")
    },
    {
      timestamps: false,
    }
  );

  Achievements.associate = (models) => {
    Achievements.belongsTo(models.Player, { foreignKey: "PlayerID" });
  };

  return Achievements;
};
