import React, { useEffect, useState } from "react";
import { Typography, Container, Grid, Card, CardContent } from "@mui/material";
import Sidebar from "../components/Sidebar"; // Import the Sidebar component
import API from "../services/api";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({});
  const [recentActivity, setRecentActivity] = useState({});
  const [highlights, setHighlights] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const metricsResponse = await API.get("/dashboard/metrics");
        const recentActivityResponse = await API.get("/dashboard/recent-activity");
        const highlightsResponse = await API.get("/dashboard/highlights");

        setMetrics(metricsResponse.data);
        setRecentActivity(recentActivityResponse.data);
        setHighlights(highlightsResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Players</Typography>
              <Typography variant="h4">{metrics.totalPlayers || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Teams</Typography>
              <Typography variant="h4">{metrics.totalTeams || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Matches</Typography>
              <Typography variant="h4">{metrics.totalMatches || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Achievements</Typography>
              <Typography variant="h4">{metrics.totalAchievements || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Recent Activity
      </Typography>
      <Grid container spacing={3}>
        {recentActivity.recentMatches?.map((match) => (
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

      {/* Performance Highlights */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Performance Highlights
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Top Batsman</Typography>
              <Typography variant="body2">
                {highlights.topBatsman?.Player?.Name || "N/A"} - {highlights.topBatsman?.Runs || 0} Runs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Top Bowler</Typography>
              <Typography variant="body2">
                {highlights.topBowler?.Player?.Name || "N/A"} - {highlights.topBowler?.Wickets || 0} Wickets
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Top Fielder</Typography>
              <Typography variant="body2">
                {highlights.topFielder?.Player?.Name || "N/A"} - {highlights.topFielder?.Catches || 0} Catches
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;