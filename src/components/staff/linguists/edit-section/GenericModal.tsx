"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
  title: string;
  children?: React.ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({
  open,
  onClose,
  onSave,
  title,
  children,
}) => {
  const handleSave = () => {
    if (onSave) {
      onSave();
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'flex-start',
          paddingTop: '10vh',
        },
      }}
      PaperProps={{
        sx: { borderRadius: 2, width: 400, margin: 0 },
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
        {title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 3 }}>
        {children || (
          <Typography sx={{ color: "#616161" }}>
            Content will be added here
          </Typography>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={onClose}
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

        {onSave && (
          <Button
            onClick={handleSave}
            variant="contained"
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
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GenericModal;

