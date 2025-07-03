import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const AddPlayerModal = ({ open, onClose, onAdd, initialData }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [teamID, setTeamID] = useState("");
  const [totalMatches, setTotalMatches] = useState("");
  const [wins, setWins] = useState("");
  const [losses, setLosses] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.Name || "");
      setAge(initialData.Age || "");
      setRole(initialData.Role || "");
      setTeamID(initialData.TeamID || "");
      setTotalMatches(initialData.TotalMatches || "");
      setWins(initialData.Wins || "");
      setLosses(initialData.Losses || "");
      setPhotoURL(initialData.PhotoURL || "");
      setBio(initialData.Bio || "");
    }
  }, [initialData]);

  const handleSubmit = () => {
    const playerData = {
      ...initialData, // Include PlayerID for editing
      Name: name,
      Age: parseInt(age),
      Role: role,
      TeamID: parseInt(teamID),
      TotalMatches: parseInt(totalMatches),
      Wins: parseInt(wins),
      Losses: parseInt(losses),
      PhotoURL: photoURL,
      Bio: bio,
    };
    onAdd(playerData);
    setName("");
    setAge("");
    setRole("");
    setTeamID("");
    setTotalMatches("");
    setWins("");
    setLosses("");
    setPhotoURL("");
    setBio("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Player" : "Add Player"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Age"
          type="number"
          fullWidth
          margin="normal"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          label="Role"
          fullWidth
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <TextField
          label="Team ID"
          type="number"
          fullWidth
          margin="normal"
          value={teamID}
          onChange={(e) => setTeamID(e.target.value)}
        />
        <TextField
          label="Total Matches"
          type="number"
          fullWidth
          margin="normal"
          value={totalMatches}
          onChange={(e) => setTotalMatches(e.target.value)}
        />
        <TextField
          label="Wins"
          type="number"
          fullWidth
          margin="normal"
          value={wins}
          onChange={(e) => setWins(e.target.value)}
        />
        <TextField
          label="Losses"
          type="number"
          fullWidth
          margin="normal"
          value={losses}
          onChange={(e) => setLosses(e.target.value)}
        />
        <TextField
          label="Photo URL"
          fullWidth
          margin="normal"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <TextField
          label="Bio"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
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

export default AddPlayerModal;