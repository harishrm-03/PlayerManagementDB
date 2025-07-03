import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Grid, Card, CardContent, Chip } from "@mui/material";
import AddAchievementModal from "../components/AddAchievementModal";
import API from "../services/api";

const Achievements = () => {
  const [achievements, setAchievements] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  // Fetch achievements grouped by category
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await API.get("/achievements/grouped");
        setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };
    fetchAchievements();
  }, []);

  // Handle adding a new achievement
  const handleAddAchievement = async (newAchievement) => {
    try {
      const response = await API.post("/achievements", newAchievement);
      setAchievements((prevAchievements) => ({
        ...prevAchievements,
        [newAchievement.Category]: [...(prevAchievements[newAchievement.Category] || []), response.data],
      }));
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding achievement:", error);
    }
  };

  // Handle editing an achievement
  const handleEditAchievement = async (updatedAchievement) => {
    try {
      await API.put(`/achievements/${updatedAchievement.AchievementID}`, updatedAchievement);
      setAchievements((prevAchievements) => {
        const category = updatedAchievement.Category;
        const updatedCategory = prevAchievements[category].map((achievement) =>
          achievement.AchievementID === updatedAchievement.AchievementID ? updatedAchievement : achievement
        );
        return { ...prevAchievements, [category]: updatedCategory };
      });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error editing achievement:", error);
    }
  };

  // Handle deleting an achievement
  const handleDeleteAchievement = async (achievementID, category) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      try {
        await API.delete(`/achievements/${achievementID}`);
        setAchievements((prevAchievements) => ({
          ...prevAchievements,
          [category]: prevAchievements[category].filter((achievement) => achievement.AchievementID !== achievementID),
        }));
      } catch (error) {
        console.error("Error deleting achievement:", error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Achievements
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsAddModalOpen(true)}
        sx={{ marginBottom: 2 }}
      >
        Add Achievement
      </Button>

      {/* Display Achievements Grouped by Category */}
      {Object.keys(achievements).map((category) => (
        <div key={category}>
          <Typography variant="h5" gutterBottom>
            {category}
          </Typography>
          <Grid container spacing={3}>
            {achievements[category].map((achievement) => (
              <Grid item xs={12} sm={6} md={4} key={achievement.AchievementID}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{achievement.Award}</Typography>
                    <Typography variant="body2">
                      <strong>Player:</strong> {achievement.Player ? achievement.Player.Name : "Unknown"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Date:</strong> {new Date(achievement.Date).toLocaleDateString()}
                    </Typography>
                    <Chip
                      label={achievement.Badge || "No Badge"}
                      color={
                        achievement.Badge === "Gold"
                          ? "warning"
                          : achievement.Badge === "Silver"
                          ? "info"
                          : "default"
                      }
                      sx={{ marginTop: 1 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}

      {/* Add/Edit Achievement Modal */}
      <AddAchievementModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAchievement}
      />
      {currentAchievement && (
        <AddAchievementModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onAdd={handleEditAchievement}
          initialData={currentAchievement}
        />
      )}
    </Container>
  );
};

export default Achievements;