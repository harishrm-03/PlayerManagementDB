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
        { model: Player, as: "BestBowler", attributes: ["Name"] },
        { model: Player, as: "BestBatsman", attributes: ["Name"] },
        { model: Player, as: "PlayerOfTheMatch", attributes: ["Name"] },
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
    console.log("Fetching match details for ID:", req.params.id);

    const match = await Match.findByPk(req.params.id, {
      include: [
        { model: Team, as: "Team1", attributes: ["TeamName"] },
        { model: Team, as: "Team2", attributes: ["TeamName"] },
        { model: Team, as: "Winner", attributes: ["TeamName"] },
        { model: Player, as: "BestBowler", attributes: ["Name"] },
        { model: Player, as: "BestBatsman", attributes: ["Name"] },
        { model: Player, as: "PlayerOfTheMatch", attributes: ["Name"] },
      ],
    });

    if (!match) {
      console.error("Match not found for ID:", req.params.id);
      return res.status(404).json({ error: "Match not found" });
    }

    console.log("Match details fetched successfully:", match);

    const battingPerformances = await BattingPerformance.findAll({
      where: { MatchID: match.MatchID },
      include: [{ model: Player, attributes: ["Name"] }],
    });

    console.log("Batting performances fetched successfully:", battingPerformances);

    const bowlingPerformances = await BowlingPerformance.findAll({
      where: { MatchID: match.MatchID },
      include: [{ model: Player, attributes: ["Name"] }],
    });

    console.log("Bowling performances fetched successfully:", bowlingPerformances);

    res.json({ match, battingPerformances, bowlingPerformances });
  } catch (error) {
    console.error("Error fetching match details:", error);
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