import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import API from "../services/api";

const PlayerProfile = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

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

        {/* Batting Performance */}
        {player.BattingPerformance && (
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Batting Performance</Typography>
                <Typography variant="body2">Matches Played: {player.BattingPerformance.MatchesPlayed}</Typography>
                <Typography variant="body2">Innings: {player.BattingPerformance.Innings}</Typography>
                <Typography variant="body2">Runs: {player.BattingPerformance.Runs}</Typography>
                <Typography variant="body2">Highest Score: {player.BattingPerformance.HighestScore}</Typography>
                <Typography variant="body2">Batting Average: {player.BattingPerformance.BattingAverage}</Typography>
                <Typography variant="body2">Strike Rate: {player.BattingPerformance.StrikeRate}</Typography>
                <Typography variant="body2">Fifties: {player.BattingPerformance.Fifties}</Typography>
                <Typography variant="body2">Hundreds: {player.BattingPerformance.Hundreds}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Bowling Performance */}
        {player.BowlingPerformance && (
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Bowling Performance</Typography>
                <Typography variant="body2">Matches Played: {player.BowlingPerformance.MatchesPlayed}</Typography>
                <Typography variant="body2">Innings: {player.BowlingPerformance.Innings}</Typography>
                <Typography variant="body2">Runs Conceded: {player.BowlingPerformance.RunsConceded}</Typography>
                <Typography variant="body2">Wickets: {player.BowlingPerformance.Wickets}</Typography>
                <Typography variant="body2">Best Bowling: {player.BowlingPerformance.BestBowling}</Typography>
                <Typography variant="body2">Economy: {player.BowlingPerformance.Economy}</Typography>
                <Typography variant="body2">Bowling Strike Rate: {player.BowlingPerformance.BowlingStrikeRate}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Fielding Performance */}
        {player.FieldingPerformance && (
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Fielding Performance</Typography>
                <Typography variant="body2">Matches Played: {player.FieldingPerformance.MatchesPlayed}</Typography>
                <Typography variant="body2">Run Outs: {player.FieldingPerformance.RunOuts}</Typography>
                <Typography variant="body2">Catches: {player.FieldingPerformance.Catches}</Typography>
                <Typography variant="body2">Stumpings: {player.FieldingPerformance.Stumpings}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Captaincy Performance */}
        {player.CaptaincyPerformance && (
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Captaincy Performance</Typography>
                <Typography variant="body2">Matches as Captain: {player.CaptaincyPerformance.MatchesAsCaptain}</Typography>
                <Typography variant="body2">Win Percentage: {player.CaptaincyPerformance.WinPercentage}%</Typography>
                <Typography variant="body2">Loss Percentage: {player.CaptaincyPerformance.LossPercentage}%</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Wicketkeeping Performance */}
        {player.WicketKeepingPerformance && (
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Wicketkeeping Performance</Typography>
                <Typography variant="body2">Matches Played: {player.WicketKeepingPerformance.MatchesPlayed}</Typography>
                <Typography variant="body2">Stumpings: {player.WicketKeepingPerformance.Stumpings}</Typography>
                <Typography variant="body2">Catches: {player.WicketKeepingPerformance.Catches}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default PlayerProfile;