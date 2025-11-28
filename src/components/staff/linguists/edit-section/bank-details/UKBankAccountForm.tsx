"use client";

import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Paper,
  Typography,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { ukBankAccountSchema, UKBankFormData } from "../schemas/bankDetailsSchema";

export interface UKBankAccountFormRef {
  validate: () => Promise<boolean>;
}

interface UKBankAccountFormProps {
  data: UKBankFormData;
  onChange: (data: UKBankFormData) => void;
}

const UKBankAccountForm = forwardRef<UKBankAccountFormRef, UKBankAccountFormProps>(
  ({ data, onChange }, ref) => {
    const {
      control,
      formState: { errors },
      setValue,
      trigger,
    } = useForm<UKBankFormData>({
      resolver: zodResolver(ukBankAccountSchema),
      defaultValues: data,
      mode: "onChange",
    });

    // Sync form data with external state
    useEffect(() => {
      Object.keys(data).forEach((key) => {
        const field = key as keyof UKBankFormData;
        setValue(field, data[field]);
      });
    }, [data, setValue]);

    // Expose validation function to parent via ref
    useImperativeHandle(ref, () => ({
      validate: async () => {
        const isValid = await trigger();
        return isValid;
      },
    }));

    const handleFieldChange = (field: keyof UKBankFormData, value: string) => {
      setValue(field, value);
      trigger(field);
      onChange({ ...data, [field]: value });
    };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: "white", mt: 2 }}>
      <Typography
        variant="h6"
        sx={{
          fontSize: 18,
          fontWeight: 550,
          color: "#1e285f",
          borderBottom: "1px solid #e0e0e0",
          pb: 2,
          mb: 3,
        }}
      >
        UK Bank account
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Name on account - Account number - Sort code (same row) */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
          {/* Name on account */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                Name on account
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
              <Tooltip title="Account holder name">
                <InfoOutlined sx={{ fontSize: 16, color: "#9e9e9e" }} />
              </Tooltip>
            </Box>
            <Controller
              name="nameOnAccount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Enter name on account"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleFieldChange("nameOnAccount", e.target.value);
                  }}
                  error={!!errors.nameOnAccount}
                  helperText={errors.nameOnAccount?.message}
                />
              )}
            />
          </Box>

          {/* Account number */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                Account number
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <Controller
              name="accountNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Enter account number"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    field.onChange(value);
                    handleFieldChange("accountNumber", value);
                  }}
                  error={!!errors.accountNumber}
                  helperText={errors.accountNumber?.message}
                  inputProps={{ maxLength: 8 }}
                />
              )}
            />
          </Box>

          {/* Sort code */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                Sort code
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <Controller
              name="sortCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Enter sort code"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    field.onChange(value);
                    handleFieldChange("sortCode", value);
                  }}
                  error={!!errors.sortCode}
                  helperText={errors.sortCode?.message}
                  inputProps={{ maxLength: 6 }}
                />
              )}
            />
          </Box>
        </Box>

        {/* Bank address city - Currency (same row) */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
          {/* Bank address city */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                Bank address city
              </Typography>
            </Box>
            <Controller
              name="bankAddressCity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Enter bank address city"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleFieldChange("bankAddressCity", e.target.value);
                  }}
                />
              )}
            />
          </Box>

          {/* Currency */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                Currency that you receive payment in
              </Typography>
            </Box>
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <Select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleFieldChange("currency", e.target.value);
                    }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select currency
                    </MenuItem>
                    <MenuItem value="GBP">GBP (British Pound)</MenuItem>
                    <MenuItem value="USD">USD (US Dollar)</MenuItem>
                    <MenuItem value="EUR">EUR (Euro)</MenuItem>
                    <MenuItem value="CAD">CAD (Canadian Dollar)</MenuItem>
                    <MenuItem value="AUD">AUD (Australian Dollar)</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Box>
          <Box></Box>
        </Box>
      </Box>
    </Paper>
  );
});

UKBankAccountForm.displayName = "UKBankAccountForm";

export default UKBankAccountForm;

