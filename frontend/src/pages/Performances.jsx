import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import PerformanceCard from "../components/PerformanceCard";
import AddPerformanceModal from "../components/AddPerformanceModal";
import EditPerformanceModal from "../components/EditPerformanceModal";
import API from "../services/api";

const Performances = () => {
  const [performances, setPerformances] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPerformance, setCurrentPerformance] = useState(null);
  const [currentType, setCurrentType] = useState("");

  // Fetch performances from the backend
  useEffect(() => {
    const fetchPerformances = async () => {
      try {
        const response = await API.get("/performances");
        setPerformances(response.data);
      } catch (error) {
        console.error("Error fetching performances:", error);
      }
    };
    fetchPerformances();
  }, []);

  // Handle adding a performance
  const handleAddPerformance = async (type, newPerformance) => {
    try {
      const response = await API.post(`/performances/${newPerformance.PlayerID}/${type}`, newPerformance);
      setPerformances((prevPerformances) =>
        prevPerformances.map((performance) =>
          performance.PlayerID === newPerformance.PlayerID
            ? { ...performance, [type]: response.data.newPerformance }
            : performance
        )
      );
      setIsAddModalOpen(false);
      alert("Performance added successfully!");
    } catch (error) {
      console.error("Error adding performance:", error);
      alert("Failed to add performance. Please try again.");
    }
  };

  // Handle editing a performance
  const handleEditPerformance = (type, performance) => {
    setCurrentType(type);
    setCurrentPerformance(performance);
    setIsEditModalOpen(true);
  };

  const saveEditedPerformance = async (updatedPerformance) => {
    try {
      const response = await API.put(`/performances/${updatedPerformance.PlayerID}/${currentType}`, updatedPerformance);
      setPerformances((prevPerformances) =>
        prevPerformances.map((performance) =>
          performance.PlayerID === updatedPerformance.PlayerID
            ? { ...performance, [currentType]: response.data.performance }
            : performance
        )
      );
      setIsEditModalOpen(false);
      alert("Performance updated successfully!");
    } catch (error) {
      console.error("Error editing performance:", error);
      alert("Failed to update performance. Please try again.");
    }
  };

  // Handle deleting a performance
  const handleDeletePerformance = async (playerID, type) => {
    console.log("Deleting performance for PlayerID:", playerID, "Type:", type);

    if (!window.confirm("Are you sure you want to delete this performance?")) return;

    try {
      await API.delete(`/performances/${playerID}/${type}`);
      setPerformances((prevPerformances) =>
        prevPerformances.map((performance) =>
          performance.PlayerID === playerID ? { ...performance, [type]: null } : performance
        )
      );
      alert("Performance deleted successfully!");
    } catch (error) {
      console.error("Error deleting performance:", error);
      alert("Failed to delete performance. Please try again.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Performances
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsAddModalOpen(true)}
        sx={{ marginBottom: 2 }}
      >
        Add Performance
      </Button>
      <Grid container spacing={3}>
        {performances.map((performance) => (
          <Grid item xs={12} sm={6} md={4} key={performance.PlayerID}>
            <PerformanceCard
              performance={performance}
              onEdit={(type) => handleEditPerformance(type, performance[type])}
              onDelete={(type) => handleDeletePerformance(performance.PlayerID, type)}
            />
          </Grid>
        ))}
      </Grid>
      <AddPerformanceModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPerformance}
        players={performances.map((performance) => ({
          PlayerID: performance.PlayerID,
          Name: performance.Name,
        }))} // Ensure players prop is passed
      />
      {currentPerformance && (
        <EditPerformanceModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={saveEditedPerformance}
          initialData={currentPerformance}
          type={currentType}
        />
      )}
    </Container>
  );
};

export default Performances;