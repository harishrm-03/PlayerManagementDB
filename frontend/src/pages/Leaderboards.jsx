import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import API from "../services/api";

const Leaderboards = () => {
  const [leaderboards, setLeaderboards] = useState({
    topBatsmen: [],
    topBowlers: [],
    topFielders: [],
  });

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const response = await API.get("/performances/leaderboards");
        setLeaderboards(response.data);
      } catch (error) {
        console.error("Error fetching leaderboards:", error);
      }
    };
    fetchLeaderboards();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Leaderboards
      </Typography>

      {/* Top Batsmen */}
      <Typography variant="h5" gutterBottom>
        Top Batsmen
      </Typography>
      <Grid2 container spacing={3}>
        {leaderboards.topBatsmen.map((batsman) => (
          <Grid2 item xs={12} sm={6} md={4} key={batsman.PlayerID}>
            <Card>
              <CardContent>
                <Typography variant="h6">{batsman.Player.Name}</Typography>
                <Typography variant="body2">Runs: {batsman.Runs}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Top Bowlers */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Top Bowlers
      </Typography>
      <Grid2 container spacing={3}>
        {leaderboards.topBowlers.map((bowler) => (
          <Grid2 item xs={12} sm={6} md={4} key={bowler.PlayerID}>
            <Card>
              <CardContent>
                <Typography variant="h6">{bowler.Player.Name}</Typography>
                <Typography variant="body2">Wickets: {bowler.Wickets}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Top Fielders */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Top Fielders
      </Typography>
      <Grid2 container spacing={3}>
        {leaderboards.topFielders.map((fielder) => (
          <Grid2 item xs={12} sm={6} md={4} key={fielder.PlayerID}>
            <Card>
              <CardContent>
                <Typography variant="h6">{fielder.Player.Name}</Typography>
                <Typography variant="body2">Catches: {fielder.Catches}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Leaderboards;