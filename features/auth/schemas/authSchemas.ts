import * as yup from "yup";

const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x21\x23-\x5b\x5d-\x7f]|\\[\x21-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x21-\x5a\x53-\x7f]|\\[\x21-\x7f])+)\])/i;

export const loginSchema = yup.object({
  email: yup
    .string()
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;

export const studentRegistrationSchema = yup.object({
  name: yup.string().required("First name is required"),
  surname: yup.string().required("Last name is required"),
  email: yup
    .string()
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  phoneCode: yup.string().required("Phone code is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  interests: yup
    .array()
    .of(yup.number().required())
    .min(1, "Please select at least one subject")
    .required("Subjects are required"),
  bio: yup.string().optional(),
  agreedToTerms: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("You must agree to the terms and conditions"),
});

export type StudentRegistrationFormData = yup.InferType<
  typeof studentRegistrationSchema
>;

export const teacherRegistrationSchema = yup.object({
  name: yup.string().required("First name is required"),
  surname: yup.string().required("Last name is required"),
  email: yup
    .string()
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  phoneCode: yup.string().required("Phone code is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  subjects: yup
    .array()
    .of(yup.number().required())
    .min(1, "Please select at least one subject")
    .required("Subjects are required"),
  experience: yup.string().required("Experience is required"),
  bio: yup.string().optional(),
  agreedToTerms: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("You must agree to the terms and conditions"),
});

export type TeacherRegistrationFormData = yup.InferType<
  typeof teacherRegistrationSchema
>;

