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
  FormHelperText,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { internationalBankAccountSchema, InternationalBankFormData } from "../schemas/bankDetailsSchema";

export interface InternationalBankAccountFormRef {
  validate: () => Promise<boolean>;
}

interface InternationalBankAccountFormProps {
  data: InternationalBankFormData;
  onChange: (data: InternationalBankFormData) => void;
}

const InternationalBankAccountForm = forwardRef<InternationalBankAccountFormRef, InternationalBankAccountFormProps>(
  ({ data, onChange }, ref) => {
    const {
      control,
      formState: { errors },
      setValue,
      trigger,
    } = useForm<InternationalBankFormData>({
      resolver: zodResolver(internationalBankAccountSchema),
      defaultValues: data,
      mode: "onChange",
    });

    // Sync form data with external state
    useEffect(() => {
      Object.keys(data).forEach((key) => {
        const field = key as keyof InternationalBankFormData;
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

    const handleFieldChange = (field: keyof InternationalBankFormData, value: string) => {
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
        Bank account
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Row 1: International account number - Name on account - SWIFT/BIC */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
          {/* International account number */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                International account number
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <Controller
              name="internationalAccountNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Enter international account number"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleFieldChange("internationalAccountNumber", e.target.value);
                  }}
                  error={!!errors.internationalAccountNumber}
                  helperText={errors.internationalAccountNumber?.message}
                />
              )}
            />
          </Box>

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

          {/* SWIFT/BIC */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                SWIFT/BIC
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <Controller
              name="swiftBic"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Enter SWIFT/BIC"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleFieldChange("swiftBic", e.target.value);
                  }}
                  error={!!errors.swiftBic}
                  helperText={errors.swiftBic?.message}
                />
              )}
            />
          </Box>
        </Box>

        {/* Row 2: IBAN - International bank address country - Currency */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
          {/* IBAN */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                IBAN
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <Controller
              name="iban"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Enter IBAN"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleFieldChange("iban", e.target.value);
                  }}
                  error={!!errors.iban}
                  helperText={errors.iban?.message}
                />
              )}
            />
          </Box>

          {/* International bank address country */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                International bank address country
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <Controller
              name="bankAddressCountry"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Enter country"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleFieldChange("bankAddressCountry", e.target.value);
                  }}
                  error={!!errors.bankAddressCountry}
                  helperText={errors.bankAddressCountry?.message}
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
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
              <Tooltip title="Payment currency">
                <InfoOutlined sx={{ fontSize: 16, color: "#9e9e9e" }} />
              </Tooltip>
            </Box>
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth size="small" error={!!errors.currency}>
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
                  {errors.currency && <FormHelperText>{errors.currency.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
});

InternationalBankAccountForm.displayName = "InternationalBankAccountForm";

export default InternationalBankAccountForm;

