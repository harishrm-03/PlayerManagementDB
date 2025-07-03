const express = require("express");
const { Player, Team, Match, Achievements, BattingPerformance, BowlingPerformance, FieldingPerformance } = require("../models");

const router = express.Router();

// Get dashboard metrics
router.get("/metrics", async (req, res) => {
  try {
    const totalPlayers = await Player.count();
    const totalTeams = await Team.count();
    const totalMatches = await Match.count();
    const totalAchievements = await Achievements.count();

    res.json({ totalPlayers, totalTeams, totalMatches, totalAchievements });
  } catch (error) {
    res.status(500).json({ error: "Error fetching metrics" });
  }
});

// Get recent activity
router.get("/recent-activity", async (req, res) => {
  try {
    const recentMatches = await Match.findAll({
      limit: 5,
      order: [["Date", "DESC"]],
      include: [
        { model: Team, as: "Team1", attributes: ["TeamName"] },
        { model: Team, as: "Team2", attributes: ["TeamName"] },
        { model: Team, as: "Winner", attributes: ["TeamName"] },
      ],
    });

    const topPerformers = await BattingPerformance.findAll({
      limit: 3,
      order: [["Runs", "DESC"]],
      include: [{ model: Player, attributes: ["Name"] }],
    });

    res.json({ recentMatches, topPerformers });
  } catch (error) {
    res.status(500).json({ error: "Error fetching recent activity" });
  }
});

// Get performance highlights
router.get("/highlights", async (req, res) => {
  try {
    const topBatsman = await BattingPerformance.findOne({
      order: [["Runs", "DESC"]],
      include: [{ model: Player, attributes: ["Name"] }],
    });

    const topBowler = await BowlingPerformance.findOne({
      order: [["Wickets", "DESC"]],
      include: [{ model: Player, attributes: ["Name"] }],
    });

    const topFielder = await FieldingPerformance.findOne({
      order: [["Catches", "DESC"]],
      include: [{ model: Player, attributes: ["Name"] }],
    });

    res.json({ topBatsman, topBowler, topFielder });
  } catch (error) {
    res.status(500).json({ error: "Error fetching highlights" });
  }
});

module.exports = router;