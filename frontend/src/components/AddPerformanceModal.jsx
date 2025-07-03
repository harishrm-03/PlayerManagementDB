import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";

const AddPerformanceModal = ({ open, onClose, onAdd, players }) => {
  const [type, setType] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!type || !formData.PlayerID || Object.keys(formData).length === 0) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await onAdd(type, formData);
      alert("Performance added successfully!");
    } catch (error) {
      alert("Failed to add performance.");
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    switch (type) {
      case "batting":
        return (
          <>
            <TextField
              label="Matches Played"
              fullWidth
              margin="normal"
              value={formData.MatchesPlayed || ""}
              onChange={(e) => handleChange("MatchesPlayed", e.target.value)}
            />
            <TextField
              label="Innings"
              fullWidth
              margin="normal"
              value={formData.Innings || ""}
              onChange={(e) => handleChange("Innings", e.target.value)}
            />
            <TextField
              label="Runs"
              fullWidth
              margin="normal"
              value={formData.Runs || ""}
              onChange={(e) => handleChange("Runs", e.target.value)}
            />
            <TextField
              label="Highest Score"
              fullWidth
              margin="normal"
              value={formData.HighestScore || ""}
              onChange={(e) => handleChange("HighestScore", e.target.value)}
            />
            <TextField
              label="Batting Average"
              fullWidth
              margin="normal"
              value={formData.BattingAverage || ""}
              onChange={(e) => handleChange("BattingAverage", e.target.value)}
            />
            <TextField
              label="Strike Rate"
              fullWidth
              margin="normal"
              value={formData.StrikeRate || ""}
              onChange={(e) => handleChange("StrikeRate", e.target.value)}
            />
            <TextField
              label="Fifties"
              fullWidth
              margin="normal"
              value={formData.Fifties || ""}
              onChange={(e) => handleChange("Fifties", e.target.value)}
            />
            <TextField
              label="Hundreds"
              fullWidth
              margin="normal"
              value={formData.Hundreds || ""}
              onChange={(e) => handleChange("Hundreds", e.target.value)}
            />
          </>
        );
      case "bowling":
        return (
          <>
            <TextField
              label="Matches Played"
              fullWidth
              margin="normal"
              value={formData.MatchesPlayed || ""}
              onChange={(e) => handleChange("MatchesPlayed", e.target.value)}
            />
            <TextField
              label="Innings"
              fullWidth
              margin="normal"
              value={formData.Innings || ""}
              onChange={(e) => handleChange("Innings", e.target.value)}
            />
            <TextField
              label="Runs Conceded"
              fullWidth
              margin="normal"
              value={formData.RunsConceded || ""}
              onChange={(e) => handleChange("RunsConceded", e.target.value)}
            />
            <TextField
              label="Wickets"
              fullWidth
              margin="normal"
              value={formData.Wickets || ""}
              onChange={(e) => handleChange("Wickets", e.target.value)}
            />
            <TextField
              label="Best Bowling"
              fullWidth
              margin="normal"
              value={formData.BestBowling || ""}
              onChange={(e) => handleChange("BestBowling", e.target.value)}
            />
            <TextField
              label="Economy"
              fullWidth
              margin="normal"
              value={formData.Economy || ""}
              onChange={(e) => handleChange("Economy", e.target.value)}
            />
            <TextField
              label="Bowling Strike Rate"
              fullWidth
              margin="normal"
              value={formData.BowlingStrikeRate || ""}
              onChange={(e) => handleChange("BowlingStrikeRate", e.target.value)}
            />
          </>
        );
      case "fielding":
        return (
          <>
            <TextField
              label="Matches Played"
              fullWidth
              margin="normal"
              value={formData.MatchesPlayed || ""}
              onChange={(e) => handleChange("MatchesPlayed", e.target.value)}
            />
            <TextField
              label="Run Outs"
              fullWidth
              margin="normal"
              value={formData.RunOuts || ""}
              onChange={(e) => handleChange("RunOuts", e.target.value)}
            />
            <TextField
              label="Catches"
              fullWidth
              margin="normal"
              value={formData.Catches || ""}
              onChange={(e) => handleChange("Catches", e.target.value)}
            />
            <TextField
              label="Stumpings"
              fullWidth
              margin="normal"
              value={formData.Stumpings || ""}
              onChange={(e) => handleChange("Stumpings", e.target.value)}
            />
          </>
        );
      case "captaincy":
        return (
          <>
            <TextField
              label="Matches as Captain"
              fullWidth
              margin="normal"
              value={formData.MatchesAsCaptain || ""}
              onChange={(e) => handleChange("MatchesAsCaptain", e.target.value)}
            />
            <TextField
              label="Win Percentage"
              fullWidth
              margin="normal"
              value={formData.WinPercentage || ""}
              onChange={(e) => handleChange("WinPercentage", e.target.value)}
            />
            <TextField
              label="Loss Percentage"
              fullWidth
              margin="normal"
              value={formData.LossPercentage || ""}
              onChange={(e) => handleChange("LossPercentage", e.target.value)}
            />
          </>
        );
      case "wicketkeeping":
        return (
          <>
            <TextField
              label="Matches Played"
              fullWidth
              margin="normal"
              value={formData.MatchesPlayed || ""}
              onChange={(e) => handleChange("MatchesPlayed", e.target.value)}
            />
            <TextField
              label="Stumpings"
              fullWidth
              margin="normal"
              value={formData.Stumpings || ""}
              onChange={(e) => handleChange("Stumpings", e.target.value)}
            />
            <TextField
              label="Catches"
              fullWidth
              margin="normal"
              value={formData.Catches || ""}
              onChange={(e) => handleChange("Catches", e.target.value)}
            />
          </>
        );
      default:
        return <Typography>Select a performance type to proceed.</Typography>;
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Performance</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Player"
          fullWidth
          margin="normal"
          value={formData.PlayerID || ""}
          onChange={(e) => handleChange("PlayerID", e.target.value)}
        >
          {players && players.length > 0 ? (
            players.map((player) => (
              <MenuItem key={player.PlayerID} value={player.PlayerID}>
                {player.Name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No players available</MenuItem>
          )}
        </TextField>
        <TextField
          select
          label="Performance Type"
          fullWidth
          margin="normal"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="batting">Batting</MenuItem>
          <MenuItem value="bowling">Bowling</MenuItem>
          <MenuItem value="fielding">Fielding</MenuItem>
          <MenuItem value="captaincy">Captaincy</MenuItem>
          <MenuItem value="wicketkeeping">Wicketkeeping</MenuItem>
        </TextField>
        {renderFields()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPerformanceModal;