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
import { paypalSchema, PaypalFormData } from "../schemas/bankDetailsSchema";

export interface PaypalFormRef {
  validate: () => Promise<boolean>;
}

interface PaypalFormProps {
  data: PaypalFormData;
  onChange: (data: PaypalFormData) => void;
}

const PaypalForm = forwardRef<PaypalFormRef, PaypalFormProps>(({ data, onChange }, ref) => {
  const {
    control,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<PaypalFormData>({
    resolver: zodResolver(paypalSchema),
    defaultValues: data,
    mode: "onChange",
  });

  // Sync form data with external state
  useEffect(() => {
    Object.keys(data).forEach((key) => {
      const field = key as keyof PaypalFormData;
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

  const handleFieldChange = (field: keyof PaypalFormData, value: string) => {
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
        Paypal
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Paypal email - Currency (same row) */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
          {/* Paypal email address */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1e285f",
                }}
              >
                Paypal email address
              </Typography>
              <Typography sx={{ color: "#d32f2f", fontSize: 14 }}>*</Typography>
            </Box>
            <Controller
              name="paypalEmail"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  type="email"
                  placeholder="Enter Paypal email address"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleFieldChange("paypalEmail", e.target.value);
                  }}
                  error={!!errors.paypalEmail}
                  helperText={errors.paypalEmail?.message}
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
          <Box></Box>
        </Box>
      </Box>
    </Paper>
  );
});

PaypalForm.displayName = "PaypalForm";

export default PaypalForm;

