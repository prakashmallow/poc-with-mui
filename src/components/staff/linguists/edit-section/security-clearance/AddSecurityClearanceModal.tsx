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
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

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

  const handleChange = (field: keyof SecurityClearanceData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    handleClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleClose = () => {
    setFormData({
      type: "",
      issueDate: "",
      expiryDate: "",
      file: null,
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { borderRadius: 2, width: 400 },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
          fontWeight: 700,
          color: "#1e285f",
        }}
      >
        Security clearance
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* BODY */}
      <DialogContent sx={{ mt: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {/* Dropdown */}
          <FormControl fullWidth size="small">
            <InputLabel>Security clearance *</InputLabel>
            <Select
              value={formData.type}
              label="Security clearance *"
              onChange={(e) => handleChange("type", e.target.value)}
            >
              <MenuItem value="BPSS">BPSS (Baseline Personnel Security Standard)</MenuItem>
              <MenuItem value="CTC">CTC (Counter Terrorist Check)</MenuItem>
              <MenuItem value="SC">SC (Security Check)</MenuItem>
              <MenuItem value="DV">DV (Developed Vetting)</MenuItem>
            </Select>
          </FormControl>

          {/* Start Date */}
          <TextField
            fullWidth
            size="small"
            label="Start date *"
            type="date"
            value={formData.issueDate}
            onChange={(e) => handleChange("issueDate", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          {/* End Date */}
          <TextField
            fullWidth
            size="small"
            label="End date *"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => handleChange("expiryDate", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <Box
            component="label"
            sx={{
              border: "1px solid #d6d6d6",
              borderRadius: 1,
              p: 4,
              textAlign: "center",
              cursor: "pointer",
              background:'#f0efeb'
            }}
          >
            <input type="file" hidden onChange={handleFileUpload} />
            <Typography sx={{ fontWeight: 600, mb: 0.2 }}>Upload document</Typography>
            <Typography sx={{ fontSize: 13, color: "#757575" }}>
              Click here or drag and drop your document
            </Typography>
            <Typography sx={{ mt: 1, fontSize: 12, color: "#9e9e9e" }}>
              Supported formats: .doc, .docx, .odt, .pdf, .jpg, .jpeg, .png, .heic, .heif
            </Typography>
          </Box>

          {/* Show filename if selected */}
          {formData.file && (
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              📄 {formData.file.name}
            </Typography>
          )}
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
        //   gap: 2,
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
          disabled={!formData.type || !formData.issueDate}
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
