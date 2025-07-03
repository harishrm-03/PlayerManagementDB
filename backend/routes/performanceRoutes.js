const express = require("express");
const {
  BattingPerformance,
  BowlingPerformance,
  FieldingPerformance,
  CaptaincyPerformance,
  WicketKeepingPerformance,
  Player,
} = require("../models");

const router = express.Router();

// Get all performance records grouped by PlayerID
router.get("/", async (req, res) => {
  try {
    const players = await Player.findAll({
      include: [
        { model: BattingPerformance },
        { model: BowlingPerformance },
        { model: FieldingPerformance },
        { model: CaptaincyPerformance },
        { model: WicketKeepingPerformance },
      ],
    });

    const performances = players.map((player) => ({
      PlayerID: player.PlayerID,
      Name: player.Name,
      Batting: player.BattingPerformance || null,
      Bowling: player.BowlingPerformance || null,
      Fielding: player.FieldingPerformance || null,
      Captaincy: player.CaptaincyPerformance || null,
      WicketKeeping: player.WicketKeepingPerformance || null,
    }));

    console.log("Performances:", performances); // Debugging
    res.json(performances);
  } catch (error) {
    console.error("Error fetching performance data:", error);
    res.status(500).json({ error: "Error fetching performance data" });
  }
});

// Get leaderboards for top performers
router.get("/leaderboards", async (req, res) => {
  try {
    const topBatsmen = await BattingPerformance.findAll({
      limit: 5,
      order: [["Runs", "DESC"]],
      include: [{ model: Player, attributes: ["Name"] }],
    });

    const topBowlers = await BowlingPerformance.findAll({
      limit: 5,
      order: [["Wickets", "DESC"]],
      include: [{ model: Player, attributes: ["Name"] }],
    });

    const topFielders = await FieldingPerformance.findAll({
      limit: 5,
      order: [["Catches", "DESC"]],
      include: [{ model: Player, attributes: ["Name"] }],
    });

    res.json({ topBatsmen, topBowlers, topFielders });
  } catch (error) {
    res.status(500).json({ error: "Error fetching leaderboards" });
  }
});

// Update specific performance
router.put("/:playerID/:type", async (req, res) => {
  const { playerID, type } = req.params;
  const updatedData = req.body;

  try {
    let performanceModel;

    switch (type.toLowerCase()) {
      case "batting":
        performanceModel = BattingPerformance;
        break;
      case "bowling":
        performanceModel = BowlingPerformance;
        break;
      case "fielding":
        performanceModel = FieldingPerformance;
        break;
      case "captaincy":
        performanceModel = CaptaincyPerformance;
        break;
      case "wicketkeeping":
        performanceModel = WicketKeepingPerformance;
        break;
      default:
        return res.status(400).json({ error: "Invalid performance type" });
    }

    const performance = await performanceModel.findOne({ where: { PlayerID: playerID } });
    if (!performance) {
      return res.status(404).json({ error: "Performance not found" });
    }

    await performance.update(updatedData);
    res.json({ message: "Performance updated successfully", performance });
  } catch (error) {
    console.error("Error updating performance:", error);
    res.status(500).json({ error: "Failed to update performance" });
  }
});

// Add a new performance
router.post("/:playerID/:type", async (req, res) => {
  const { playerID, type } = req.params;
  const performanceData = req.body;

  console.log("Incoming request:", { playerID, type, performanceData }); // Debugging

  try {
    let performanceModel;

    switch (type.toLowerCase()) {
      case "batting":
        performanceModel = BattingPerformance;
        break;
      case "bowling":
        performanceModel = BowlingPerformance;
        break;
      case "fielding":
        performanceModel = FieldingPerformance;
        break;
      case "captaincy":
        performanceModel = CaptaincyPerformance;
        break;
      case "wicketkeeping":
        performanceModel = WicketKeepingPerformance;
        break;
      default:
        return res.status(400).json({ error: "Invalid performance type" });
    }

    const newPerformance = await performanceModel.create({
      PlayerID: playerID,
      ...performanceData,
    });

    res.status(201).json({ message: "Performance added successfully", newPerformance });
  } catch (error) {
    console.error("Error adding performance:", error); // Log the error
    res.status(500).json({ error: "Failed to add performance" });
  }
});

// Delete a specific performance type
router.delete("/:id/:type", async (req, res) => {
  try {
    const { type } = req.params;

    if (type === "batting") {
      await BattingPerformance.destroy({ where: { PlayerID: req.params.id } });
    } else if (type === "bowling") {
      await BowlingPerformance.destroy({ where: { PlayerID: req.params.id } });
    } else if (type === "fielding") {
      await FieldingPerformance.destroy({ where: { PlayerID: req.params.id } });
    } else {
      return res.status(400).json({ error: "Invalid performance type" });
    }

    res.json({ message: "Performance deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting performance" });
  }
});

module.exports = router;