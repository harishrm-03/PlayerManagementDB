const express = require("express");
const { Player, Team, BattingPerformance, BowlingPerformance, FieldingPerformance, Achievements } = require("../models");
const { Op } = require("sequelize");

const router = express.Router();

// Create a player
router.post("/", async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ error: "Error creating player" });
  }
});

// Get all players
router.get("/", async (req, res) => {
  const { role, team, sortBy, name } = req.query;

  try {
    const where = {};
    if (role) where.Role = role;
    if (team) where.TeamID = team;
    if (name) where.Name = { [Op.like]: `%${name}%` }; // Add this line to filter by name

    const order = [];
    if (sortBy === "runs") order.push([{ model: BattingPerformance }, "Runs", "DESC"]);
    if (sortBy === "wickets") order.push([{ model: BowlingPerformance }, "Wickets", "DESC"]);

    const players = await Player.findAll({
      where,
      include: [{ model: Team, attributes: ["TeamName"] }],
      order,
    });

    res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Error fetching players" });
  }
});

// Get a single player's profile
router.get("/:id", async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id, {
      include: [
        { model: Team, attributes: ["TeamName"] },
        { model: BattingPerformance },
        { model: BowlingPerformance },
        { model: FieldingPerformance },
        { model: Achievements },
      ],
    });

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json(player);
  } catch (error) {
    res.status(500).json({ error: "Error fetching player profile" });
  }
});

// Update player
router.put("/:id", async (req, res) => {
  try {
    const updated = await Player.update(req.body, { where: { PlayerID: req.params.id } });
    res.json({ message: "Player updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating player" });
  }
});

// Delete player
router.delete("/:id", async (req, res) => {
  try {
    await Player.destroy({ where: { PlayerID: req.params.id } });
    res.json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting player" });
  }
});

module.exports = router;