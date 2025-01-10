import * as Yup from "yup";

export const storeSetupPageFormikValidationSchema = Yup.object().shape({
  storeName: Yup.string().required("Required"),
  storeTagName: Yup.string().required("Required"),
  storePhoneNumber: Yup.string()
    .required("Required")
    .matches(/^\d+$/, "Phone number must be a valid number"),
  storeEmail: Yup.string().email("Invalid email").required("Email is required"),
});
