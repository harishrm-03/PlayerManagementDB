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
    if (type === "batting") {
      return (
        <>
          <TextField
            label="Runs"
            fullWidth
            margin="normal"
            value={formData.Runs || ""}
            onChange={(e) => handleChange("Runs", e.target.value)}
          />
          <TextField
            label="Strike Rate"
            fullWidth
            margin="normal"
            value={formData.StrikeRate || ""}
            onChange={(e) => handleChange("StrikeRate", e.target.value)}
          />
        </>
      );
    } else if (type === "bowling") {
      return (
        <>
          <TextField
            label="Wickets"
            fullWidth
            margin="normal"
            value={formData.Wickets || ""}
            onChange={(e) => handleChange("Wickets", e.target.value)}
          />
          <TextField
            label="Economy"
            fullWidth
            margin="normal"
            value={formData.Economy || ""}
            onChange={(e) => handleChange("Economy", e.target.value)}
          />
        </>
      );
    }
    return <Typography>Select a performance type to proceed.</Typography>;
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