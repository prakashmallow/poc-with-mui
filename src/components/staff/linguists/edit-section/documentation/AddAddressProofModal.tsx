"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
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

export interface AddressProofData {
  proofType: string;
  file?: File | null;
}

interface AddAddressProofModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: AddressProofData) => void;
}

const AddAddressProofModal: React.FC<AddAddressProofModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<AddressProofData>({
    proofType: "",
    file: null,
  });
  const [triggerValidation, setTriggerValidation] = useState(false);

  const handleChange = (field: keyof AddressProofData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.proofType || !formData.file) {
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
      proofType: "",
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
        Add Address Proof
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* BODY */}
      <DialogContent sx={{ mt: 3, mb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Proof type */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                Proof type
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <FormControl fullWidth size="small">
              <Select
                value={formData.proofType}
                onChange={(e) => handleChange("proofType", e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Proof type
                </MenuItem>
                <MenuItem value="Utility Bill">Utility Bill</MenuItem>
                <MenuItem value="Bank Statement">Bank Statement</MenuItem>
                <MenuItem value="Council Tax Bill">Council Tax Bill</MenuItem>
                <MenuItem value="Tenancy Agreement">Tenancy Agreement</MenuItem>
                <MenuItem value="Mortgage Statement">Mortgage Statement</MenuItem>
                <MenuItem value="Driving Licence">Driving Licence</MenuItem>
                <MenuItem value="Voter Registration">Voter Registration</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
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
          disabled={!formData.proofType || !formData.file}
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

export default AddAddressProofModal;

