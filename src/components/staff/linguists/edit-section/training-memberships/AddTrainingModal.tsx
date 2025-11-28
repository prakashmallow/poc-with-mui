"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import FileUpload from "../common/FileUpload";

export interface TrainingData {
  trainingCourseName: string;
  file?: File | null;
}

interface AddTrainingModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: TrainingData) => void;
}

const AddTrainingModal: React.FC<AddTrainingModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<TrainingData>({
    trainingCourseName: "",
    file: null,
  });
  const [triggerValidation, setTriggerValidation] = useState(false);

  const handleChange = (field: keyof TrainingData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.trainingCourseName.trim() || !formData.file) {
      setTriggerValidation(true);
      return;
    }
    setTriggerValidation(false);
    onSave(formData);
    handleClose();
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleClose = () => {
    setFormData({
      trainingCourseName: "",
      file: null,
    });
    setTriggerValidation(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-container": {
          alignItems: "flex-start",
          paddingTop: "10vh",
        },
      }}
      PaperProps={{
        sx: { borderRadius: 2, width: 450, margin: 0 },
      }}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
          fontWeight: 500,
          color: "#1e285f",
        }}
      >
        Continuous professional development
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* BODY */}
      <DialogContent sx={{ mt: 3, mb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* What is the name of the training course you have completed? */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                What is the name of the training course you have completed?
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <TextField
              fullWidth
              size="small"
              value={formData.trainingCourseName}
              onChange={(e) => handleChange("trainingCourseName", e.target.value)}
              placeholder="Enter training course name"
            />
          </Box>

          {/* File Upload */}
          <FileUpload 
            onFileChange={handleFileChange} 
            selectedFile={formData.file}
            triggerValidation={triggerValidation}
            required={true}
          />
        </Box>
      </DialogContent>

      {/* FOOTER */}
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderColor: "#9e9e9e",
            color: "#5b5b5b",
            border: "1px solid",
            "&:hover": { bgcolor: "#f4f4f4" },
          }}
        >
          <CloseIcon sx={{ mr: 1, fontSize: 18 }} /> CANCEL
        </Button>

        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!formData.trainingCourseName.trim() || !formData.file}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            bgcolor: "#081c61",
            "&:hover": { bgcolor: "#04143d" },
          }}
        >
          <SaveIcon sx={{ mr: 1, fontSize: 18 }} />
          SUBMIT
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTrainingModal;

