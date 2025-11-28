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

export interface NativeLanguageData {
  nativeLanguage: string;
}

interface AddNativeLanguageModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: NativeLanguageData) => void;
}

const AddNativeLanguageModal: React.FC<AddNativeLanguageModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<NativeLanguageData>({
    nativeLanguage: "",
  });

  const handleChange = (field: keyof NativeLanguageData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      nativeLanguage: "",
    });
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
        Native Language
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* BODY */}
      <DialogContent sx={{ mt: 3, mb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Native Language */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                Native Language
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <FormControl fullWidth size="small">
              <Select
                value={formData.nativeLanguage}
                onChange={(e) => handleChange("nativeLanguage", e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Native Language
                </MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="German">German</MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="Portuguese">Portuguese</MenuItem>
                <MenuItem value="Arabic">Arabic</MenuItem>
                <MenuItem value="Chinese">Chinese</MenuItem>
                <MenuItem value="Japanese">Japanese</MenuItem>
                <MenuItem value="Russian">Russian</MenuItem>
                <MenuItem value="Hindi">Hindi</MenuItem>
                <MenuItem value="Urdu">Urdu</MenuItem>
                <MenuItem value="Bengali">Bengali</MenuItem>
                <MenuItem value="Turkish">Turkish</MenuItem>
                <MenuItem value="Polish">Polish</MenuItem>
                <MenuItem value="Dutch">Dutch</MenuItem>
                <MenuItem value="Greek">Greek</MenuItem>
                <MenuItem value="Swedish">Swedish</MenuItem>
                <MenuItem value="Norwegian">Norwegian</MenuItem>
                <MenuItem value="Danish">Danish</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
          disabled={!formData.nativeLanguage}
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

export default AddNativeLanguageModal;

