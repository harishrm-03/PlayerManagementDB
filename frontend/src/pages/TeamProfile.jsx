import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import API from "../services/api";

const TeamProfile = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await API.get(`/teams/${id}`);
        setTeam(response.data.team);
        setMatches(response.data.matches);
      } catch (error) {
        console.error("Error fetching team profile:", error);
      }
    };
    fetchTeam();
  }, [id]);

  if (!team) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {team.TeamName} Profile
      </Typography>
      <Typography variant="h6">Coach: {team.Coach}</Typography>
      <Typography variant="h6">Captain: {team.Captain?.Name || "N/A"}</Typography>

      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Players
      </Typography>
      <Grid container spacing={3}>
        {team.Players.map((player) => (
          <Grid item xs={12} sm={6} md={4} key={player.PlayerID}>
            <Card>
              <CardContent>
                <Typography variant="h6">{player.Name}</Typography>
                <Typography variant="body2">Role: {player.Role}</Typography>
                <Typography variant="body2">Age: {player.Age}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Match History
      </Typography>
      <Grid container spacing={3}>
        {matches.map((match) => (
          <Grid item xs={12} sm={6} md={4} key={match.MatchID}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {match.Team1.TeamName} vs {match.Team2.TeamName}
                </Typography>
                <Typography variant="body2">
                  Winner: {match.Winner ? match.Winner.TeamName : "TBD"}
                </Typography>
                <Typography variant="body2">
                  Date: {new Date(match.Date).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeamProfile;