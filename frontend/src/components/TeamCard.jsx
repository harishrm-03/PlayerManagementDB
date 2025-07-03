import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";

const TeamCard = ({ team, onEdit, onDelete, onViewProfile }) => {
  return (
    <Card>
      {/* Display the team logo */}
      {team.LogoURL && (
        <CardMedia
          component="img"
          height="140"
          image={team.LogoURL} // Ensure this is the correct field
          alt={`${team.TeamName} Logo`}
        />
      )}
      <CardContent>
        <Typography variant="h6">{team.TeamName}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(team)}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() => onDelete(team.TeamID)}>
          Delete
        </Button>
        <Button size="small" color="info" onClick={() => onViewProfile(team.TeamID)}>
          View Profile
        </Button>
      </CardActions>
    </Card>
  );
};

export default TeamCard;