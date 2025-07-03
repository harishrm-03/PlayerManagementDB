import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const EditPerformanceModal = ({ open, onClose, onSave, initialData, type }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  const renderFields = () => {
    if (type === "batting") {
      return (
        <>
          <TextField
            label="Runs"
            fullWidth
            margin="normal"
            value={formData.Runs || ""}
            onChange={(e) => handleChange("Runs", e.target.value)}
          />
          <TextField
            label="Strike Rate"
            fullWidth
            margin="normal"
            value={formData.StrikeRate || ""}
            onChange={(e) => handleChange("StrikeRate", e.target.value)}
          />
        </>
      );
    } else if (type === "bowling") {
      return (
        <>
          <TextField
            label="Wickets"
            fullWidth
            margin="normal"
            value={formData.Wickets || ""}
            onChange={(e) => handleChange("Wickets", e.target.value)}
          />
          <TextField
            label="Economy"
            fullWidth
            margin="normal"
            value={formData.Economy || ""}
            onChange={(e) => handleChange("Economy", e.target.value)}
          />
        </>
      );
    }
    return null;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit {type.charAt(0).toUpperCase() + type.slice(1)} Performance</DialogTitle>
      <DialogContent>{renderFields()}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPerformanceModal;