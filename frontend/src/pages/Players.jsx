import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Button, TextField, MenuItem } from "@mui/material";
import PlayerCard from "../components/PlayerCard";
import AddPlayerModal from "../components/AddPlayerModal";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce"; // Install lodash.debounce for debouncing

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]); // Store team data
  const [filters, setFilters] = useState({ role: "", team: "", minAge: "", maxAge: "", sortBy: "", name: "" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams(); // Fetch team data on component mount
  }, []);

  useEffect(() => {
    const debouncedFetch = debounce(fetchPlayers, 300); // Debounce API calls
    debouncedFetch();
    return () => debouncedFetch.cancel(); // Cleanup debounce on unmount
  }, [filters]);

  const fetchPlayers = async () => {
    try {
      // Validate minAge and maxAge
      if (filters.minAge && filters.maxAge && parseInt(filters.minAge) > parseInt(filters.maxAge)) {
        alert("Minimum age cannot be greater than maximum age.");
        return;
      }

      const response = await API.get("/players", { params: filters });
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await API.get("/teams");
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddPlayer = async (newPlayer) => {
    if (!newPlayer.Name || !newPlayer.Age || !newPlayer.Role) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await API.post("/players", newPlayer);
      setPlayers((prevPlayers) => [...prevPlayers, response.data]);
      setIsAddModalOpen(false);
      alert("Player added successfully!");
    } catch (error) {
      console.error("Error adding player:", error);
      alert("Failed to add player. Please try again.");
    }
  };

  const handleEditPlayer = async (updatedPlayer) => {
    if (!updatedPlayer.Name || !updatedPlayer.Age || !updatedPlayer.Role) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await API.put(`/players/${updatedPlayer.PlayerID}`, updatedPlayer);
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.PlayerID === updatedPlayer.PlayerID ? updatedPlayer : player
        )
      );
      setIsEditModalOpen(false);
      alert("Player updated successfully!");
    } catch (error) {
      console.error("Error editing player:", error);
      alert("Failed to update player. Please try again.");
    }
  };

  const handleDeletePlayer = async (playerID) => {
    if (!window.confirm("Are you sure you want to delete this player?")) return;

    try {
      await API.delete(`/players/${playerID}`);
      setPlayers((prevPlayers) => prevPlayers.filter((player) => player.PlayerID !== playerID));
      alert("Player deleted successfully!");
    } catch (error) {
      console.error("Error deleting player:", error);
      alert("Failed to delete player. Please try again.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Players
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Role"
            fullWidth
            value={filters.role}
            onChange={(e) => handleFilterChange("role", e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Batsman">Batsman</MenuItem>
            <MenuItem value="Bowler">Bowler</MenuItem>
            <MenuItem value="All-rounder">All-rounder</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Team"
            fullWidth
            value={filters.team}
            onChange={(e) => handleFilterChange("team", e.target.value)}
          >
            <MenuItem value="">All Teams</MenuItem>
            {teams.map((team) => (
              <MenuItem key={team.TeamID} value={team.TeamID}>
                {team.TeamName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search by Name"
            fullWidth
            value={filters.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Player List */}
      {players.length === 0 ? (
        <Typography>No players found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {players.map((player) => (
            <Grid item xs={12} sm={6} md={4} key={player.PlayerID}>
              <PlayerCard
                player={player}
                onViewProfile={() => navigate(`/players/${player.PlayerID}`)}
                onEdit={(player) => {
                  setCurrentPlayer(player);
                  setIsEditModalOpen(true);
                }}
                onDelete={handleDeletePlayer}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Player Modal */}
      <Button variant="contained" color="primary" onClick={() => setIsAddModalOpen(true)}>
        Add Player
      </Button>
      <AddPlayerModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPlayer}
      />
      {currentPlayer && (
        <AddPlayerModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onAdd={handleEditPlayer}
          initialData={currentPlayer}
        />
      )}
    </Container>
  );
};

export default Players;