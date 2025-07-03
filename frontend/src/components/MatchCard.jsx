import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

const MatchCard = ({ match, onEdit, onDelete, onViewDetails }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          {match.Team1 ? match.Team1.TeamName : "Unknown"} vs {match.Team2 ? match.Team2.TeamName : "Unknown"}
        </Typography>
        <Typography variant="body2">
          <strong>Date:</strong> {new Date(match.Date).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          <strong>Winner:</strong> {match.Winner ? match.Winner.TeamName : "TBD"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(match)}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() => onDelete(match.MatchID)}>
          Delete
        </Button>
        <Button size="small" color="info" onClick={() => onViewDetails(match.MatchID)}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default MatchCard;