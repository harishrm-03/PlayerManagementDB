const express = require("express");
const { Achievements, Player } = require("../models");

const router = express.Router();

// Add an achievement
router.post("/", async (req, res) => {
  try {
    const achievement = await Achievements.create(req.body);
    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ error: "Error adding achievement" });
  }
});

// Get all achievements
router.get("/", async (req, res) => {
  try {
    const achievements = await Achievements.findAll({
      include: [{ model: Player, attributes: ["Name"] }],
    });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: "Error fetching achievements" });
  }
});

// Fetch achievements grouped by category
router.get("/grouped", async (req, res) => {
  try {
    const achievements = await Achievements.findAll({
      include: [{ model: Player, attributes: ["Name"] }],
    });

    const groupedAchievements = achievements.reduce((acc, achievement) => {
      const category = achievement.Category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(achievement);
      return acc;
    }, {});

    res.json(groupedAchievements);
  } catch (error) {
    res.status(500).json({ error: "Error fetching grouped achievements" });
  }
});

// Update an achievement
router.put("/:id", async (req, res) => {
  try {
    const updated = await Achievements.update(req.body, { where: { AchievementID: req.params.id } });
    res.json({ message: "Achievement updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating achievement" });
  }
});

// Delete an achievement
router.delete("/:id", async (req, res) => {
  try {
    await Achievements.destroy({ where: { AchievementID: req.params.id } });
    res.json({ message: "Achievement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting achievement" });
  }
});

module.exports = router;