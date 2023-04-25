import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  username:
    Yup.string()
    .required("field is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("field is required"),
});
