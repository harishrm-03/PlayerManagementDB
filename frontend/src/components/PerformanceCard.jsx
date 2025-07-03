import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

const PerformanceCard = ({ performance, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Player: {performance.Name || "Unknown"}</Typography>
        {performance.Batting && (
          <>
            <Typography variant="body2">Runs: {performance.Batting.Runs}</Typography>
            <Typography variant="body2">Strike Rate: {performance.Batting.StrikeRate}</Typography>
            <Button size="small" color="primary" onClick={() => onEdit("Batting")}>
              Edit Batting
            </Button>
            <Button size="small" color="secondary" onClick={() => onDelete("Batting")}>
              Delete Batting
            </Button>
          </>
        )}
        {performance.Bowling && (
          <>
            <Typography variant="body2">Wickets: {performance.Bowling.Wickets}</Typography>
            <Typography variant="body2">Economy: {performance.Bowling.Economy}</Typography>
            <Button size="small" color="primary" onClick={() => onEdit("Bowling")}>
              Edit Bowling
            </Button>
            <Button size="small" color="secondary" onClick={() => onDelete("Bowling")}>
              Delete Bowling
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;