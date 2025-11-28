"use client";

import React, { useRef } from "react";
import { Box, Typography, FormHelperText, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  selectedFile?: File | null;
  error?: string; // Pass error from react-hook-form
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileChange,
  selectedFile,
  error, // Get error from form state
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  const openUploadDialog = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
  };

  return (
    <>
      <Box
        onClick={openUploadDialog}
        sx={{
          border: error ? "1px solid #d32f2f" : "1px solid #d6d6d6",
          borderRadius: 1,
          p: 3,
          textAlign: "center",
          cursor: "pointer",
          bgcolor: "#f0efeb",
          display: "block",
        }}
      >
        <input type="file" hidden onChange={handleFileUpload} ref={fileInputRef} />
        <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Upload document</Typography>
        <Typography sx={{ fontSize: 13, color: "#757575" }}>
          Click here or drag and drop your document
        </Typography>
        <Typography sx={{ mt: 1, fontSize: 12, color: "#9e9e9e" }}>
          Supported formats: .doc, .docx, .odt, .pdf, .jpg, .jpeg, .png, .heic, .heif
        </Typography>
      </Box>

      {selectedFile && (
        <Box
          sx={{
            mt: 2,
            borderRadius: 1,
            backgroundColor: "#f2f1ef",
            border: "1px solid #d6d6d6",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
          }}
        >
          <Typography sx={{ color: "#1e285f", fontSize: 15, fontWeight: 500 }}>
            {selectedFile.name}
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={openUploadDialog}
              sx={{
                border: "1px solid #1e285f",
                p: 0.7,
                borderRadius: "50%",
                "& svg": { color: "#1e285f", fontSize: 18 },
              }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={removeFile}
              sx={{
                border: "1px solid #c62828",
                p: 0.7,
                borderRadius: "50%",
                "& svg": { color: "#c62828", fontSize: 18 },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      {error && (
        <FormHelperText error sx={{ mt: 1, ml: 0 }}>
          {error}
        </FormHelperText>
      )}
    </>
  );
};

export default FileUpload;