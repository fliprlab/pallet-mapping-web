import { userEditValidation, userValidation } from "./user/user.validation";
import { loginValidation } from "./login/login.validation";
import { location } from "./locations/location";
import { grid } from "./grid/grid";

export const VALIDATIONS = {
  loginValidation,
  userValidation,
  userEditValidation,
  location,
  grid,
};
