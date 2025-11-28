"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Paper, Typography, RadioGroup, FormControlLabel, Radio, Box } from "@mui/material";
import ContentLayout from "@/components/staff/linguists/edit-section/ContentLayout";
import UKBankAccountForm, { UKBankAccountFormRef } from "@/components/staff/linguists/edit-section/bank-details/UKBankAccountForm";
import PaymentTypeSelector, { PaymentTypeSelectorRef } from "@/components/staff/linguists/edit-section/bank-details/PaymentTypeSelector";
import InternationalBankAccountForm, {
  InternationalBankAccountFormRef,
} from "@/components/staff/linguists/edit-section/bank-details/InternationalBankAccountForm";
import PaypalForm, { PaypalFormRef } from "@/components/staff/linguists/edit-section/bank-details/PaypalForm";
import { UKBankFormData, InternationalBankFormData, PaypalFormData } from "@/components/staff/linguists/edit-section/schemas/bankDetailsSchema";

export default function BankDetailsPage() {
  const router = useRouter();
  const [bankType, setBankType] = useState("uk");
  const [paymentType, setPaymentType] = useState("");
  const [ukBankData, setUkBankData] = useState<UKBankFormData>({
    nameOnAccount: "",
    accountNumber: "",
    sortCode: "",
    bankAddressCity: "",
    currency: "",
  });
  const [internationalBankData, setInternationalBankData] = useState<InternationalBankFormData>({
    internationalAccountNumber: "",
    nameOnAccount: "",
    swiftBic: "",
    iban: "",
    bankAddressCountry: "",
    currency: "",
  });
  const [paypalData, setPaypalData] = useState<PaypalFormData>({
    paypalEmail: "",
    currency: "",
  });

  // Refs for form validation
  const ukBankFormRef = useRef<UKBankAccountFormRef>(null);
  const paymentTypeSelectorRef = useRef<PaymentTypeSelectorRef>(null);
  const internationalBankFormRef = useRef<InternationalBankAccountFormRef>(null);
  const paypalFormRef = useRef<PaypalFormRef>(null);

  const handleSave = async () => {
    let isValid = true;

    if (bankType === "uk") {
      // Validate UK Bank Account form
      const ukValid = await ukBankFormRef.current?.validate();
      isValid = ukValid ?? false;
    } else if (bankType === "international") {
      // Validate Payment Type Selector
      const paymentTypeValid = await paymentTypeSelectorRef.current?.validate();
      if (!paymentTypeValid) {
        isValid = false;
      } else {
        // Validate the selected payment form
        if (paymentType === "bankAccount") {
          const internationalValid = await internationalBankFormRef.current?.validate();
          isValid = internationalValid ?? false;
        } else if (paymentType === "paypal") {
          const paypalValid = await paypalFormRef.current?.validate();
          isValid = paypalValid ?? false;
        } else {
          isValid = false;
        }
      }
    }

    if (!isValid) {
      return;
    }

    console.log("Saving bank details data", {
      bankType,
      paymentType,
      ukBankData,
      internationalBankData,
      paypalData,
    });
  };

  const handleCancel = () => {
    router.push(`/staff/linguists`);
  };

  return (
    <ContentLayout
      title="Bank Details"
      onSave={handleSave}
      onCancel={handleCancel}
    >
      <Paper elevation={0} sx={{ p: 2, borderRadius: 2, bgcolor: "white" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2, // space between label and radio buttons
            flexWrap: "wrap",
          }}
        >
          {/* Label + * in same row */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
            <Typography fontSize={12} sx={{ color: "#1e285f" }}>
              Bank account type
            </Typography>
            <Typography fontSize={12} sx={{ color: "red" }}>
              *
            </Typography>
          </Box>

          {/* Radio buttons */}
          <RadioGroup
            row
            value={bankType}
            onChange={(e) => {
              setBankType(e.target.value);
              setPaymentType(""); // Reset payment type when bank type changes
            }}
            sx={{
              color: "#081c61",
              "&.Mui-checked": {
                color: "red",
              },
            }}
          >
            <FormControlLabel
              value="uk"
              control={ <Radio
                size="small"
                sx={{
                  color: "#081c61",
                  "&.Mui-checked": {
                    color: "#081c61",
                  },
                }}
              />}   // 👈 make selection blue
              label="UK Bank account"
              sx={{ "& .MuiTypography-root": { fontSize: 14 } }}
            />
            <FormControlLabel
              value="international"
              control={ <Radio
                size="small"
                sx={{
                  color: "#081c61",
                  "&.Mui-checked": {
                    color: "#081c61",
                  },
                }}
              />}   // 👈 make selection blue
              label="International Bank account"
              sx={{ "& .MuiTypography-root": { fontSize: 14 } }}
            />
          </RadioGroup>
        </Box>
      </Paper>

      {/* UK Bank account form */}
      {bankType === "uk" && (
        <UKBankAccountForm 
          ref={ukBankFormRef}
          data={ukBankData} 
          onChange={setUkBankData}
        />
      )}

      {/* International Bank account form */}
      {bankType === "international" && (
        <>
          <PaymentTypeSelector 
            ref={paymentTypeSelectorRef}
            value={paymentType} 
            onChange={setPaymentType}
          />

          {paymentType === "bankAccount" && (
            <InternationalBankAccountForm
              ref={internationalBankFormRef}
              data={internationalBankData}
              onChange={setInternationalBankData}
            />
          )}

          {paymentType === "paypal" && (
            <PaypalForm 
              ref={paypalFormRef}
              data={paypalData} 
              onChange={setPaypalData}
            />
          )}
        </>
      )}
    </ContentLayout>
  );
}
