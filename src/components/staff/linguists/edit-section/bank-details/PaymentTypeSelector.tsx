"use client";

import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Paper, Typography, RadioGroup, FormControlLabel, Radio, Box, FormHelperText } from "@mui/material";
import { paymentTypeSchema, PaymentType } from "../schemas/bankDetailsSchema";

export interface PaymentTypeSelectorRef {
  validate: () => Promise<boolean>;
}

interface PaymentTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const PaymentTypeSelector = forwardRef<PaymentTypeSelectorRef, PaymentTypeSelectorProps>(
  ({ value, onChange }, ref) => {
    const {
      control,
      formState: { errors },
      setValue,
      trigger,
    } = useForm<{ paymentType: PaymentType }>({
      resolver: zodResolver(z.object({ paymentType: paymentTypeSchema })),
      defaultValues: { paymentType: value as PaymentType },
      mode: "onChange",
    });

    // Sync form data with external state
    useEffect(() => {
      setValue("paymentType", value as PaymentType);
    }, [value, setValue]);

    // Expose validation function to parent via ref
    useImperativeHandle(ref, () => ({
      validate: async () => {
        const isValid = await trigger();
        return isValid;
      },
    }));

    const handleChange = (newValue: string) => {
      setValue("paymentType", newValue as PaymentType);
      trigger("paymentType");
      onChange(newValue);
    };
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 2, bgcolor: "white", mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
            <Typography fontSize={12} sx={{ color: "#1e285f" }}>
              Payment type
            </Typography>
            <Typography fontSize={12} sx={{ color: "red" }}>
              *
            </Typography>
          </Box>

          <Controller
            name="paymentType"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                row
                onChange={(e) => handleChange(e.target.value)}
                sx={{
                  color: "#081c61",
                  "&.Mui-checked": {
                    color: "red",
                  },
                }}
              >
          <FormControlLabel
            value="bankAccount"
            control={
              <Radio
                size="small"
                sx={{
                  color: "#081c61",
                  "&.Mui-checked": {
                    color: "#081c61",
                  },
                }}
              />
            }
            label="Bank account"
            sx={{ "& .MuiTypography-root": { fontSize: 14 } }}
          />
          <FormControlLabel
            value="paypal"
            control={
              <Radio
                size="small"
                sx={{
                  color: "#081c61",
                  "&.Mui-checked": {
                    color: "#081c61",
                  },
                }}
              />
            }
            label="Paypal"
            sx={{ "& .MuiTypography-root": { fontSize: 14 } }}
          />
        </RadioGroup>
            )}
          />
        </Box>
        {errors.paymentType && (
          <FormHelperText error sx={{ ml: 0, mt: 0.5 }}>
            {errors.paymentType.message}
          </FormHelperText>
        )}
      </Box>
    </Paper>
  );
});

PaymentTypeSelector.displayName = "PaymentTypeSelector";

export default PaymentTypeSelector;

