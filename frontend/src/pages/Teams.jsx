import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import TeamCard from "../components/TeamCard";
import AddTeamModal from "../components/AddTeamModal";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Teams
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsAddModalOpen(true)}
        sx={{ marginBottom: 2 }}
      >
        Add Team
      </Button>
      <Grid container spacing={3}>
        {teams.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.TeamID}>
            <TeamCard
              team={team}
              onViewProfile={(teamID) => navigate(`/teams/${teamID}`)} // Navigate to team profile
            />
          </Grid>
        ))}
      </Grid>

      <AddTeamModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTeam}
      />
    </Container>
  );
};

export default Teams;