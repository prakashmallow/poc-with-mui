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
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export interface RefereeData {
  name: string;
  email: string;
}

export interface WorkHistoryData {
  dateEngagedFrom: string;
  dateEngagedTo: string;
  role: string;
  natureOfWork: string;
  organisationName: string;
  referees: RefereeData[];
}

interface AddWorkHistoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: WorkHistoryData) => void;
}

const AddWorkHistoryModal: React.FC<AddWorkHistoryModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<WorkHistoryData>({
    dateEngagedFrom: "",
    dateEngagedTo: "",
    role: "",
    natureOfWork: "",
    organisationName: "",
    referees: [{ name: "", email: "" }],
  });

  const handleChange = (field: keyof WorkHistoryData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRefereeChange = (index: number, field: keyof RefereeData, value: string) => {
    setFormData((prev) => {
      const newReferees = [...prev.referees];
      newReferees[index] = { ...newReferees[index], [field]: value };
      return { ...prev, referees: newReferees };
    });
  };

  const handleAddReferee = () => {
    setFormData((prev) => ({
      ...prev,
      referees: [...prev.referees, { name: "", email: "" }],
    }));
  };

  const handleRemoveReferee = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      referees: prev.referees.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      dateEngagedFrom: "",
      dateEngagedTo: "",
      role: "",
      natureOfWork: "",
      organisationName: "",
      referees: [{ name: "", email: "" }],
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      sx={{
        "& .MuiDialog-container": {
          alignItems: "flex-start",
          paddingTop: "10vh",
        },
      }}
      PaperProps={{
        sx: { borderRadius: 2, width: 900, margin: 0, maxWidth: "none" },
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
        Add Work History
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* BODY */}
      <DialogContent sx={{ mt: 2, mb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {/* Date engaged from - Date engaged to (same row) */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#1e285f",
                  }}
                >
                  Date engaged from
                </Typography>
                <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
              </Box>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={formData.dateEngagedFrom}
                onChange={(e) => handleChange("dateEngagedFrom", e.target.value)}
                placeholder="Select date"
              />
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#1e285f",
                  }}
                >
                  Date engaged to
                </Typography>
                <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
              </Box>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={formData.dateEngagedTo}
                onChange={(e) => handleChange("dateEngagedTo", e.target.value)}
                placeholder="Select date"
              />
            </Box>
          </Box>

          {/* Role - Nature of work (same row) */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#1e285f",
                  }}
                >
                  Role
                </Typography>
                <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
              </Box>
              <TextField
                fullWidth
                size="small"
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
                placeholder="Enter Role"
              />
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#1e285f",
                  }}
                >
                  Nature of work
                </Typography>
                <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
              </Box>
              <TextField
                fullWidth
                size="small"
                value={formData.natureOfWork}
                onChange={(e) => handleChange("natureOfWork", e.target.value)}
                placeholder="Enter Nature of work"
              />
            </Box>
          </Box>

          {/* Organisation name */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#1e285f",
                  }}
                >
                  Organisation name
                </Typography>
                <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
              </Box>
              <TextField
                fullWidth
                size="small"
                value={formData.organisationName}
                onChange={(e) => handleChange("organisationName", e.target.value)}
                placeholder="Enter Organisation name"
              />
            </Box>
            <Box></Box>
          </Box>

          {/* Border bottom below Organisation name */}
          <Box sx={{ borderBottom: "1px solid #e0e0e0", pb: 1.5 }} />

          {/* Border/Divider */}
          <Divider sx={{ my: 0.5 }} />

          {/* Referee section header */}
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "#1e285f",
              mb: 0.5,
            }}
          >
            Referee
          </Typography>

          {/* Referee fields */}
          {formData.referees.map((referee, index) => (
            <Box key={index} sx={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 2, alignItems: "flex-start" }}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#1e285f",
                    }}
                  >
                    Name
                  </Typography>
                  <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
                </Box>
                <TextField
                  fullWidth
                  size="small"
                  value={referee.name}
                  onChange={(e) => handleRefereeChange(index, "name", e.target.value)}
                  placeholder="Enter Name"
                />
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#1e285f",
                    }}
                  >
                    Email
                  </Typography>
                  <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
                </Box>
                <TextField
                  fullWidth
                  size="small"
                  type="email"
                  value={referee.email}
                  onChange={(e) => handleRefereeChange(index, "email", e.target.value)}
                  placeholder="Enter Email"
                />
              </Box>
              {formData.referees.length > 1 && (
                <IconButton
                  onClick={() => handleRemoveReferee(index)}
                  sx={{
                    mt: 2.5,
                    color: "#d32f2f",
                    "&:hover": { bgcolor: "rgba(211, 47, 47, 0.08)" },
                  }}
                  size="small"
                >
                  <HighlightOffIcon />
                </IconButton>
              )}
            </Box>
          ))}

          {/* Add another referee link */}
          <Typography
            onClick={handleAddReferee}
            sx={{
              fontSize: 13,
              color: "green",
              cursor: "pointer",
              textDecoration: "underline",
              mt: 0.5,
              "&:hover": { color: "#081c61" },
            }}
          >
            + Add another referee for this job
          </Typography>
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
            !formData.dateEngagedFrom ||
            !formData.dateEngagedTo ||
            !formData.role ||
            !formData.natureOfWork ||
            !formData.organisationName ||
            formData.referees.some((ref) => !ref.name || !ref.email)
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

export default AddWorkHistoryModal;

