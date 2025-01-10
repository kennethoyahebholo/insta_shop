import * as Yup from "yup";

export const profileSetupPageFormikValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  userName: Yup.string().required("Required"),
  phone: Yup.string()
    .required("Required")
    .matches(/^\d+$/, "Phone number must be a valid number"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});
