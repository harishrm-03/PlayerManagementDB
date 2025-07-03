import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

const AddAchievementModal = ({ open, onClose, onAdd, initialData }) => {
  const [playerID, setPlayerID] = useState("");
  const [award, setAward] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Individual"); // Default category
  const [badge, setBadge] = useState(""); // Badge field

  useEffect(() => {
    if (initialData) {
      setPlayerID(initialData.PlayerID || "");
      setAward(initialData.Award || "");
      setDate(initialData.Date ? new Date(initialData.Date).toISOString().split("T")[0] : "");
      setCategory(initialData.Category || "Individual");
      setBadge(initialData.Badge || "");
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!playerID || !award || !date || !category) {
      alert("Please fill in all required fields.");
      return;
    }

    const achievementData = {
      ...initialData, // Include AchievementID for editing
      PlayerID: parseInt(playerID),
      Award: award,
      Date: new Date(date),
      Category: category,
      Badge: badge,
    };
    onAdd(achievementData);
    setPlayerID("");
    setAward("");
    setDate("");
    setCategory("Individual");
    setBadge("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Achievement" : "Add Achievement"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Player ID"
          fullWidth
          margin="normal"
          value={playerID}
          onChange={(e) => setPlayerID(e.target.value)}
        />
        <TextField
          label="Award"
          fullWidth
          margin="normal"
          value={award}
          onChange={(e) => setAward(e.target.value)}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          select
          label="Category"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="Individual">Individual</MenuItem>
          <MenuItem value="Team">Team</MenuItem>
        </TextField>
        <TextField
          select
          label="Badge"
          fullWidth
          margin="normal"
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
        >
          <MenuItem value="Gold">Gold</MenuItem>
          <MenuItem value="Silver">Silver</MenuItem>
          <MenuItem value="Bronze">Bronze</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {initialData ? "Save Changes" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAchievementModal;