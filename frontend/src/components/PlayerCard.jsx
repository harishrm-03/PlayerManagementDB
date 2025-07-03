import React from "react";
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from "@mui/material";

const PlayerCard = ({ player, onEdit, onDelete, onViewProfile }) => {
  return (
    <Card>
      {/* Display Player Photo */}
      {player.PhotoURL && (
        <CardMedia
          component="img"
          height="140"
          image={player.PhotoURL || "http://localhost:5173/photos/default_player.jpg"}
          alt={`${player.Name}'s photo`}
          style={{ objectFit: "contain" }}
        />
      )}
      <CardContent>
        <Typography variant="h6">{player.Name}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(player)}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() => onDelete(player.PlayerID)}>
          Delete
        </Button>
        <Button size="small" color="info" onClick={() => onViewProfile(player.PlayerID)}>
          View Stats
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlayerCard;