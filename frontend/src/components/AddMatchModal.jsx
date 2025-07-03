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
import API from "../services/api";

const AddMatchModal = ({ open, onClose, onAdd, initialData }) => {
  const [teams, setTeams] = useState([]);
  const [team1ID, setTeam1ID] = useState("");
  const [team2ID, setTeam2ID] = useState("");
  const [winnerTeamID, setWinnerTeamID] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [matchType, setMatchType] = useState("");

  useEffect(() => {
    // Fetch all teams for the dropdown
    const fetchTeams = async () => {
      try {
        const response = await API.get("/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();

    if (initialData) {
      setTeam1ID(initialData.Team1ID || "");
      setTeam2ID(initialData.Team2ID || "");
      setWinnerTeamID(initialData.WinnerTeamID || "");
      setDate(initialData.Date ? new Date(initialData.Date).toISOString().split("T")[0] : "");
      setVenue(initialData.Venue || "");
      setMatchType(initialData.MatchType || "");
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!team1ID || !team2ID || !date || !venue || !matchType) {
      alert("Please fill in all required fields.");
      return;
    }

    // Ensure the winning team is one of the two participating teams
    if (winnerTeamID && winnerTeamID !== team1ID && winnerTeamID !== team2ID) {
      alert("The winning team must be one of the two participating teams.");
      return;
    }

    const matchData = {
      ...initialData, // Include MatchID for editing
      Team1ID: parseInt(team1ID),
      Team2ID: parseInt(team2ID),
      WinnerTeamID: winnerTeamID ? parseInt(winnerTeamID) : null,
      Date: new Date(date),
      Venue: venue,
      MatchType: matchType,
    };
    onAdd(matchData);
    setTeam1ID("");
    setTeam2ID("");
    setWinnerTeamID("");
    setDate("");
    setVenue("");
    setMatchType("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Match" : "Add Match"}</DialogTitle>
      <DialogContent>
        {/* Team 1 Dropdown */}
        <TextField
          select
          label="Team 1"
          fullWidth
          margin="normal"
          value={team1ID}
          onChange={(e) => setTeam1ID(e.target.value)}
        >
          {teams.map((team) => (
            <MenuItem key={team.TeamID} value={team.TeamID}>
              {team.TeamName}
            </MenuItem>
          ))}
        </TextField>

        {/* Team 2 Dropdown */}
        <TextField
          select
          label="Team 2"
          fullWidth
          margin="normal"
          value={team2ID}
          onChange={(e) => setTeam2ID(e.target.value)}
        >
          {teams.map((team) => (
            <MenuItem key={team.TeamID} value={team.TeamID}>
              {team.TeamName}
            </MenuItem>
          ))}
        </TextField>

        {/* Winner Team Dropdown */}
        <TextField
          select
          label="Winner Team"
          fullWidth
          margin="normal"
          value={winnerTeamID}
          onChange={(e) => setWinnerTeamID(e.target.value)}
        >
          <MenuItem value="">TBD</MenuItem>
          {team1ID && (
            <MenuItem value={team1ID}>
              {teams.find((team) => team.TeamID === parseInt(team1ID))?.TeamName}
            </MenuItem>
          )}
          {team2ID && (
            <MenuItem value={team2ID}>
              {teams.find((team) => team.TeamID === parseInt(team2ID))?.TeamName}
            </MenuItem>
          )}
        </TextField>

        {/* Date Input */}
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Venue Input */}
        <TextField
          label="Venue"
          fullWidth
          margin="normal"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        />

        {/* Match Type Input */}
        <TextField
          label="Match Type"
          fullWidth
          margin="normal"
          value={matchType}
          onChange={(e) => setMatchType(e.target.value)}
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

export default AddMatchModal;