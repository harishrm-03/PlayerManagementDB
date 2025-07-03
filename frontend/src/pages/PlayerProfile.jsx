import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import API from "../services/api";

const PlayerProfile = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await API.get(`/players/${id}`);
        setPlayer(response.data);
      } catch (error) {
        console.error("Error fetching player profile:", error);
      }
    };

    fetchPlayer();
  }, [id]);

  if (!player) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {player.Name}'s Profile
      </Typography>
      <Grid container spacing={3}>
        {/* Personal Details */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Personal Details</Typography>
              <Typography variant="body2">Age: {player.Age}</Typography>
              <Typography variant="body2">Role: {player.Role}</Typography>
              <Typography variant="body2">Team: {player.Team?.TeamName || "N/A"}</Typography>
              <Typography variant="body2">Bio: {player.Bio || "N/A"}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlayerProfile;