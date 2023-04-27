import { LoadingOverlay } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import TheLayout from "../container/TheLayout";
import { useCheckAuthenticated } from "../hooks/auth/useCheckAuthenthicated";
import {
  checkUserAuthenticate,
  logoutUser,
} from "../services/authenticate.service";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isLoading: authLoading } = useCheckAuthenticated(
    (res) => checkUserAuthenticate(res, navigate),
    () => logoutUser()
  );
  if (authLoading) {
    return <LoadingOverlay visible={true} overlayBlur={2} />;
  }

  return <TheLayout />;
};

export default ProtectedRoute;
