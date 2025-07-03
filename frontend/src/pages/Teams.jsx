import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, TextField, MenuItem, Card, CardContent } from "@mui/material";
import TeamCard from "../components/TeamCard";
import AddTeamModal from "../components/AddTeamModal";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await API.get("/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);

  const handleAddTeam = async (newTeam) => {
    if (!newTeam.TeamName || !newTeam.Coach) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await API.post("/teams", newTeam);
      setTeams((prevTeams) => [...prevTeams, response.data]);
      setIsAddModalOpen(false);
      alert("Team added successfully!");
    } catch (error) {
      console.error("Error adding team:", error);
      alert("Failed to add team. Please try again.");
    }
  };

  const handleEditTeam = async (updatedTeam) => {
    if (!updatedTeam.TeamName || !updatedTeam.Coach) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await API.put(`/teams/${updatedTeam.TeamID}`, updatedTeam);
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team.TeamID === updatedTeam.TeamID ? updatedTeam : team
        )
      );
      setIsEditModalOpen(false);
      alert("Team updated successfully!");
    } catch (error) {
      console.error("Error editing team:", error);
      alert("Failed to update team. Please try again.");
    }
  };

  const handleDeleteTeam = async (teamID) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;

    try {
      await API.delete(`/teams/${teamID}`);
      setTeams((prevTeams) => prevTeams.filter((team) => team.TeamID !== teamID));
      alert("Team deleted successfully!");
    } catch (error) {
      console.error("Error deleting team:", error);
      alert("Failed to delete team. Please try again.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Teams
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Team
      </Button>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {teams.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.TeamID}>
            <TeamCard
              team={team}
              onViewProfile={(teamID) => navigate(`/teams/${teamID}`)} // Navigate to team profile
              onEdit={(team) => {
                setCurrentTeam(team);
                setIsEditModalOpen(true);
              }}
              onDelete={handleDeleteTeam}
            />
          </Grid>
        ))}
      </Grid>

      <AddTeamModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTeam}
      />
      {currentTeam && (
        <AddTeamModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onAdd={handleEditTeam}
          initialData={currentTeam}
        />
      )}
    </Container>
  );
};

export default Teams;