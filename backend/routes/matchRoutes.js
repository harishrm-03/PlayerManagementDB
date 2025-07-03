const express = require("express");
const { Match, Team, BattingPerformance, BowlingPerformance, Player } = require("../models");

const router = express.Router();

// Create a match
router.post("/", async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ error: "Error creating match" });
  }
});

router.post("/schedule", async (req, res) => {
  try {
    const { Team1ID, Team2ID, Date, Venue, MatchType } = req.body;

    // Check if teams are available
    const existingMatch = await Match.findOne({
      where: {
        [Op.or]: [{ Team1ID }, { Team2ID }],
        Date,
      },
    });

    if (existingMatch) {
      return res.status(400).json({ error: "One or both teams are already scheduled for another match on this date." });
    }

    const match = await Match.create({ Team1ID, Team2ID, Date, Venue, MatchType });
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ error: "Error scheduling match" });
  }
});

// Get all matches
router.get("/", async (req, res) => {
  try {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: "Team1", attributes: ["TeamName"] },
        { model: Team, as: "Team2", attributes: ["TeamName"] },
        { model: Team, as: "Winner", attributes: ["TeamName"] },
      ],
    });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: "Error fetching matches" });
  }
});

// Get a match by ID
router.get("/:id", async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id, {
      include: [
        { model: Team, as: "Team1", attributes: ["TeamName"] },
        { model: Team, as: "Team2", attributes: ["TeamName"] },
        { model: Team, as: "Winner", attributes: ["TeamName"] },
      ],
    });

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    // Fetch batting and bowling performances for the match
    const battingPerformances = await BattingPerformance.findAll({
      where: { MatchID: match.MatchID },
      include: [{ model: Player, attributes: ["Name"] }],
    });

    const bowlingPerformances = await BowlingPerformance.findAll({
      where: { MatchID: match.MatchID },
      include: [{ model: Player, attributes: ["Name"] }],
    });

    res.json({ match, battingPerformances, bowlingPerformances });
  } catch (error) {
    res.status(500).json({ error: "Error fetching match details" });
  }
});

// Update a match
router.put("/:id", async (req, res) => {
  try {
    const updated = await Match.update(req.body, { where: { MatchID: req.params.id } });
    res.json({ message: "Match updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating match" });
  }
});

// Delete a match
router.delete("/:id", async (req, res) => {
  try {
    await Match.destroy({ where: { MatchID: req.params.id } });
    res.json({ message: "Match deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting match" });
  }
});

module.exports = router;