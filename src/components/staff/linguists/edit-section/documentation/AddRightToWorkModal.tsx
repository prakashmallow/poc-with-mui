"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import FileUpload from "../common/FileUpload";

export interface RightToWorkData {
  rightToWork: string;
  expiryDate: string;
  indefiniteLeave: boolean;
  file?: File | null;
}

interface AddRightToWorkModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: RightToWorkData) => void;
}

const AddRightToWorkModal: React.FC<AddRightToWorkModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<RightToWorkData>({
    rightToWork: "",
    expiryDate: "",
    indefiniteLeave: false,
    file: null,
  });
  const [triggerValidation, setTriggerValidation] = useState(false);

  const handleChange = (field: keyof RightToWorkData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.rightToWork || !formData.expiryDate || !formData.file) {
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
      rightToWork: "",
      expiryDate: "",
      indefiniteLeave: false,
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
        Right to Work
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* BODY */}
      <DialogContent sx={{ mt: 3, mb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Right to work */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                Right to work
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <FormControl fullWidth size="small">
              <Select
                value={formData.rightToWork}
                onChange={(e) => handleChange("rightToWork", e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Right to work
                </MenuItem>
                <MenuItem value="UK Citizen">UK Citizen</MenuItem>
                <MenuItem value="EU Settled Status">EU Settled Status</MenuItem>
                <MenuItem value="EU Pre-Settled Status">EU Pre-Settled Status</MenuItem>
                <MenuItem value="Work Visa">Work Visa</MenuItem>
                <MenuItem value="Student Visa">Student Visa</MenuItem>
                <MenuItem value="Dependent Visa">Dependent Visa</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Right to work - Expiry date */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                Right to work - Expiry date
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <TextField
              fullWidth
              size="small"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => handleChange("expiryDate", e.target.value)}
              placeholder="Select Expiry date"
            />
          </Box>

          {/* Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.indefiniteLeave}
                onChange={(e) => handleChange("indefiniteLeave", e.target.checked)}
              />
            }
            label="I have indefinite leave to remain in the UK"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: 14,
                color: "#1e285f",
              },
            }}
          />

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
          disabled={!formData.rightToWork || !formData.expiryDate || !formData.file}
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

export default AddRightToWorkModal;

