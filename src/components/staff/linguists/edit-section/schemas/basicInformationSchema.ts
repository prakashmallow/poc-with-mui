import { z } from "zod";

export const basicInformationSchema = z.object({
  title: z.string().min(1, "Please select title"),
  forename: z.string().min(1, "Please enter forename, you cannot skip this field"),
  surname: z.string().min(1, "Please enter surname, you cannot skip this field"),
  dateOfBirth: z.string().min(1, "Please enter date of birth, you cannot skip this field"),
  countryOfBirth: z.string().min(1, "Please select country of birth, you cannot skip this field"),
  gender: z.string().min(1, "Please select gender, you cannot skip this field"),
  employmentStatus: z.string().min(1, "Please select employment status, you cannot skip this field"),
  vatRegistered: z.string().optional(),
  photo: z.instanceof(File, { message: "Please upload a photo of yourself, you cannot skip this field" }).nullable().refine((file) => file !== null && file instanceof File, {
    message: "Please upload a photo of yourself, you cannot skip this field",
  }),
});

export type BasicInformationFormData = z.infer<typeof basicInformationSchema>;

