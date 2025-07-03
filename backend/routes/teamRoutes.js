const express = require("express");
const { Team, Player, Match } = require("../models");
const { Op } = require("sequelize");

const router = express.Router();

// Create a new team
router.post("/", async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: "Error creating team" });
  }
});

// Get all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: [
        { model: Player, as: "Captain", attributes: ["Name"] } // Include captain's name
      ]
    });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: "Error fetching teams" });
  }
});

// Get a team by ID
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id, {
      include: [
        { model: Player, attributes: ["PlayerID", "Name", "Role", "Age"] },
        { model: Player, as: "Captain", attributes: ["Name"] },
      ],
    });

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const matches = await Match.findAll({
      where: {
        [Op.or]: [{ Team1ID: team.TeamID }, { Team2ID: team.TeamID }],
      },
      include: [
        { model: Team, as: "Team1", attributes: ["TeamName"] },
        { model: Team, as: "Team2", attributes: ["TeamName"] },
        { model: Team, as: "Winner", attributes: ["TeamName"] },
      ],
    });

    res.json({ team, matches });
  } catch (error) {
    res.status(500).json({ error: "Error fetching team profile" });
  }
});

// Update a team
router.put("/:id", async (req, res) => {
  try {
    const updated = await Team.update(req.body, { where: { TeamID: req.params.id } });
    res.json({ message: "Team updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating team" });
  }
});

// Delete a team
router.delete("/:id", async (req, res) => {
  try {
    await Team.destroy({ where: { TeamID: req.params.id } });
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error); // Log the error
    res.status(500).json({ error: "Error deleting team" });
  }
});

router.get("/compare/:team1ID/:team2ID", async (req, res) => {
  try {
    const team1 = await Team.findByPk(req.params.team1ID, {
      include: [{ model: Player, attributes: ["PlayerID", "Name", "Role"] }],
    });
    const team2 = await Team.findByPk(req.params.team2ID, {
      include: [{ model: Player, attributes: ["PlayerID", "Name", "Role"] }],
    });

    if (!team1 || !team2) {
      return res.status(404).json({ error: "One or both teams not found" });
    }

    const team1Matches = await Match.count({
      where: {
        [Op.or]: [{ Team1ID: team1.TeamID }, { Team2ID: team1.TeamID }],
      },
    });

    const team2Matches = await Match.count({
      where: {
        [Op.or]: [{ Team1ID: team2.TeamID }, { Team2ID: team2.TeamID }],
      },
    });

    res.json({
      team1: { ...team1.toJSON(), totalMatches: team1Matches },
      team2: { ...team2.toJSON(), totalMatches: team2Matches },
    });
  } catch (error) {
    res.status(500).json({ error: "Error comparing teams" });
  }
});

module.exports = router;