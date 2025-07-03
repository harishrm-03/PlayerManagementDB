import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

const AchievementCard = ({ achievement, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{achievement.Award}</Typography>
        <Typography variant="body2">
          <strong>Player:</strong> {achievement.Player ? achievement.Player.Name : "Unknown"}
        </Typography>
        <Typography variant="body2">
          <strong>Date:</strong> {new Date(achievement.Date).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(achievement)}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() => onDelete(achievement.AchievementID)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default AchievementCard;