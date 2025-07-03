import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import MatchCard from "../components/MatchCard";
import AddMatchModal from "../components/AddMatchModal";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(null);
  const navigate = useNavigate();

  // Fetch matches from the backend
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await API.get("/matches");
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };
    fetchMatches();
  }, []);

  // Handle adding a new match
  const handleAddMatch = async (newMatch) => {
    if (!newMatch.Team1ID || !newMatch.Team2ID || !newMatch.Date || !newMatch.Venue || !newMatch.MatchType) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await API.post("/matches", newMatch);
      setMatches((prevMatches) => [...prevMatches, response.data]);
      setIsAddModalOpen(false);
      alert("Match added successfully!");
    } catch (error) {
      console.error("Error adding match:", error);
      alert("Failed to add match. Please try again.");
    }
  };

  // Handle editing a match
  const handleEditMatch = async (updatedMatch) => {
    if (!updatedMatch.Team1ID || !updatedMatch.Team2ID || !updatedMatch.Date || !updatedMatch.Venue || !updatedMatch.MatchType) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await API.put(`/matches/${updatedMatch.MatchID}`, updatedMatch);
      setMatches((prevMatches) =>
        prevMatches.map((match) =>
          match.MatchID === updatedMatch.MatchID ? updatedMatch : match
        )
      );
      setIsEditModalOpen(false);
      alert("Match updated successfully!");
    } catch (error) {
      console.error("Error editing match:", error);
      alert("Failed to update match. Please try again.");
    }
  };

  // Handle deleting a match
  const handleDeleteMatch = async (matchID) => {
    if (window.confirm("Are you sure you want to delete this match?")) {
      try {
        await API.delete(`/matches/${matchID}`);
        setMatches((prevMatches) =>
          prevMatches.filter((match) => match.MatchID !== matchID)
        );
      } catch (error) {
        console.error("Error deleting match:", error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Matches
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Match
      </Button>
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {matches.map((match) => (
          <Grid item xs={12} sm={6} md={4} key={match.MatchID}>
            <MatchCard
              match={match}
              onViewDetails={(matchID) => navigate(`/matches/${matchID}`)} // Navigate to match details
              onEdit={(match) => {
                setCurrentMatch(match);
                setIsEditModalOpen(true);
              }}
              onDelete={handleDeleteMatch}
            />
          </Grid>
        ))}
      </Grid>
      <AddMatchModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMatch}
      />
      {currentMatch && (
        <AddMatchModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onAdd={handleEditMatch}
          initialData={currentMatch} // Pass initial data for editing
        />
      )}
    </Container>
  );
};

export default Matches;