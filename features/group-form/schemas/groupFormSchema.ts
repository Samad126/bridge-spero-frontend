import * as yup from "yup";
import { Language } from "../types/groupFormTypes";

export const createGroupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Group name is required")
    .min(3, "Group name must be at least 3 characters")
    .max(100, "Group name must not exceed 100 characters"),
  
  categoryId: yup
    .number()
    .required("Category is required")
    .positive("Category must be a positive number"),
  
  language: yup
    .mixed<Language>()
    .oneOf(Object.values(Language), "Invalid language selected")
    .required("Language is required"),
  
  startDate: yup
    .string()
    .required("Start date is required")
    .test("is-valid-date", "Please select a valid date", (value) => {
      if (!value) return false;
      // Accept both YYYY-MM-DD (from date input) and dd.MM.yyyy formats
      const dateRegex1 = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
      const dateRegex2 = /^\d{2}\.\d{2}\.\d{4}$/; // dd.MM.yyyy
      return dateRegex1.test(value) || dateRegex2.test(value);
    }),
  
  durationInMonths: yup
    .number()
    .required("Duration is required")
    .positive("Duration must be a positive number")
    .integer("Duration must be a whole number")
    .min(1, "Duration must be at least 1 month")
    .max(24, "Duration must not exceed 24 months"),

  maxStudents: yup
    .number()
    .required("Maximum students is required")
    .positive("Maximum students must be a positive number")
    .integer("Maximum students must be a whole number")
    .min(1, "Maximum students must be at least 1"),
  
  price: yup
    .number()
    .transform((value, originalValue) => {
      // Handle empty string or invalid input
      if (originalValue === "" || originalValue === null || originalValue === undefined) {
        return undefined;
      }
      return isNaN(value) ? undefined : value;
    })
    .required("Price is required")
    .positive("Price must be a positive number")
    .min(0.01, "Price must be at least 0.01"),
  
  description: yup
    .string()
    .max(1000, "Description must not exceed 1000 characters"),
});

export type CreateGroupFormData = yup.InferType<typeof createGroupSchema>;

