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
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import FileUpload from "../common/FileUpload";

export interface SecurityClearanceData {
  type: string;
  issueDate: string;
  expiryDate: string;
  file?: File | null;
}

interface AddSecurityClearanceModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: SecurityClearanceData) => void;
}

const AddSecurityClearanceModal: React.FC<AddSecurityClearanceModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<SecurityClearanceData>({
    type: "",
    issueDate: "",
    expiryDate: "",
    file: null,
  });
  const [triggerValidation, setTriggerValidation] = useState(false);

  const handleChange = (field: keyof SecurityClearanceData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.type || !formData.issueDate || !formData.file) {
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
      type: "",
      issueDate: "",
      expiryDate: "",
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
        '& .MuiDialog-container': {
          alignItems: 'flex-start',
          paddingTop: '10vh',
        },
      }}
      PaperProps={{
        sx: { borderRadius: 2, width: 450, margin: 0 },
      }}
    >
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
        Security clearance
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* BODY */}
      <DialogContent sx={{ mt: 3, mb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Security clearance */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                Security clearance
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>

            </Box>
            <FormControl fullWidth size="small">
              <Select
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Security clearance
                </MenuItem>
                <MenuItem value="BPSS">BPSS (Baseline Personnel Security Standard)</MenuItem>
                <MenuItem value="CTC">CTC (Counter Terrorist Check)</MenuItem>
                <MenuItem value="SC">SC (Security Check)</MenuItem>
                <MenuItem value="DV">DV (Developed Vetting)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Start Date */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                Start date
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <TextField
              fullWidth
              size="small"
              type="date"
              value={formData.issueDate}
              onChange={(e) => handleChange("issueDate", e.target.value)}
              placeholder="Select Start date"
            />
          </Box>

          {/* End Date */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                End date
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <TextField
              fullWidth
              size="small"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => handleChange("expiryDate", e.target.value)}
              placeholder="Select End date"
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
          disabled={!formData.type || !formData.issueDate || !formData.file}
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

export default AddSecurityClearanceModal;
