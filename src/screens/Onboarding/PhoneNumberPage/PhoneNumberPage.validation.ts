import * as Yup from "yup";

export const phoneNumberFormikValidationSchema = Yup.object().shape({
  phoneOrEmail: Yup.string().required("Required"),
});
