import * as Yup from "yup";

export const location = Yup.object().shape({
  location: Yup.string()
    // .matches(/^[.a-zA-Z0-9,!? ]*$/, "Allowed Characters: Alpha Numeric")
    .required("field is required"),
});
