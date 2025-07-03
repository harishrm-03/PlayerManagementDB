import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

const TeamProfile = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [matches, setMatches] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedSection, setSelectedSection] = useState("Players");

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await API.get(`/teams/${id}`);
        setTeam(response.data.team);
        setMatches(response.data.matches);
      } catch (error) {
        console.error("Error fetching team profile:", error);
      }
    };

    const fetchAchievements = async () => {
      try {
        const response = await API.get(`/achievements?teamID=${id}`);
        setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const response = await API.get(`/teams/${id}/leaderboard`);
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchTeamData();
    fetchAchievements();
    fetchLeaderboard();
  }, [id]);

  const renderSection = () => {
    switch (selectedSection) {
      case "Players":
        return (
          <Grid container spacing={3}>
            {team?.Players.map((player) => (
              <Grid item xs={12} sm={6} md={4} key={player.PlayerID}>
                <Card>
                  {player.PhotoURL && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={player.PhotoURL}
                      alt={`${player.Name}'s photo`}
                      style={{ objectFit: "contain" }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">{player.Name}</Typography>
                    <Typography variant="body2">Role: {player.Role}</Typography>
                    <Typography variant="body2">Age: {player.Age}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );
      case "Matches":
        return (
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
        );
      case "Achievements":
        return (
          <Grid container spacing={3}>
            {achievements.map((achievement) => (
              <Grid item xs={12} sm={6} md={4} key={achievement.AchievementID}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{achievement.Award}</Typography>
                    <Typography variant="body2">
                      Date: {new Date(achievement.Date).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );
      case "Leaderboard":
        return (
          <Grid container spacing={3}>
            {leaderboard.map((player, index) => (
              <Grid item xs={12} sm={6} md={4} key={player.PlayerID}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {index + 1}. {player.Name}
                    </Typography>
                    <Typography variant="body2">
                      Total Points: {player.TotalPoints}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );
      default:
        return <Typography>Select a section to view details.</Typography>;
    }
  };

  return (
    <Container>
      <Sidebar />
      <Typography variant="h4" gutterBottom>
        {team?.TeamName} Profile
      </Typography>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <Button
          variant={selectedSection === "Players" ? "contained" : "outlined"}
          onClick={() => setSelectedSection("Players")}
        >
          Players
        </Button>
        <Button
          variant={selectedSection === "Matches" ? "contained" : "outlined"}
          onClick={() => setSelectedSection("Matches")}
        >
          Matches
        </Button>
        <Button
          variant={selectedSection === "Achievements" ? "contained" : "outlined"}
          onClick={() => setSelectedSection("Achievements")}
        >
          Achievements
        </Button>
        <Button
          variant={selectedSection === "Leaderboard" ? "contained" : "outlined"}
          onClick={() => setSelectedSection("Leaderboard")}
        >
          Leaderboard
        </Button>
      </Box>
      {renderSection()}
    </Container>
  );
};

export default TeamProfile;