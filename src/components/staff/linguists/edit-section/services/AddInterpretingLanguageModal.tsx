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

export interface InterpretingLanguageData {
  fromLanguage: string;
  toLanguage: string;
  hoursExperience: string;
  hoursJusticeLegal: string;
}

interface AddInterpretingLanguageModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: InterpretingLanguageData) => void;
}

const AddInterpretingLanguageModal: React.FC<AddInterpretingLanguageModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<InterpretingLanguageData>({
    fromLanguage: "",
    toLanguage: "",
    hoursExperience: "",
    hoursJusticeLegal: "",
  });

  const handleChange = (field: keyof InterpretingLanguageData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      fromLanguage: "",
      toLanguage: "",
      hoursExperience: "",
      hoursJusticeLegal: "",
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
        Interpreting Language
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* BODY */}
      <DialogContent sx={{ mt: 3, mb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* From Language */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                From Language
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <FormControl fullWidth size="small">
              <Select
                value={formData.fromLanguage}
                onChange={(e) => handleChange("fromLanguage", e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select From Language
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
              </Select>
            </FormControl>
          </Box>

          {/* To Language */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                To Language
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <FormControl fullWidth size="small">
              <Select
                value={formData.toLanguage}
                onChange={(e) => handleChange("toLanguage", e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select To Language
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
              </Select>
            </FormControl>
          </Box>

          {/* Number of hours interpreting experience */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                Number of hours interpreting experience
              </Typography>
              <IconButton size="small" sx={{ padding: 0, ml: 0.5 }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: "1.5px solid #9e9e9e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    color: "#9e9e9e",
                    fontWeight: 600,
                  }}
                >
                  i
                </Box>
              </IconButton>
            </Box>
            <TextField
              fullWidth
              size="small"
              type="number"
              value={formData.hoursExperience}
              placeholder="Enter number of hours"
              onChange={(e) => handleChange("hoursExperience", e.target.value)}
            />
          </Box>

          {/* Number of hours interpreting experience in justice/legal setting */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                Number of hours interpreting experience in justice/legal setting
              </Typography>
              <IconButton size="small" sx={{ padding: 0, ml: 0.5 }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: "1.5px solid #9e9e9e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    color: "#9e9e9e",
                    fontWeight: 600,
                  }}
                >
                  i
                </Box>
              </IconButton>
            </Box>
            <TextField
              fullWidth
              size="small"
              type="number"
              value={formData.hoursJusticeLegal}
              placeholder="Enter number of hours"
              onChange={(e) => handleChange("hoursJusticeLegal", e.target.value)}
            />
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
          disabled={
            !formData.fromLanguage ||
            !formData.toLanguage
          }
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

export default AddInterpretingLanguageModal;

