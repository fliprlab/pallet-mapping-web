import React, { useState } from "react";
import CustomAlertModal from "./CustomAlertModal";

const defaultValues: GlobalAlertOb = {
  show: () => {},
};

export const CustomAlertContext =
  React.createContext<GlobalAlertOb>(defaultValues);
export const CustomAlertConsumer = CustomAlertContext.Consumer;

type props = {
  children?: React.ReactNode;
};

const initials: AlertMessage = {
  title: "",
  message: "",
  variant: "success",
};

function GlobalAlert(props: props) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState<AlertMessage>(initials);

  const alert: GlobalAlertOb = {
    show: (alertData: AlertMessage) => {
      setAlertProps(alertData);
      setShowAlert(true);
    },
  };

  return (
    <CustomAlertContext.Provider value={alert}>
      {props.children}
      {showAlert && (
        <CustomAlertModal
          alertData={alertProps}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
    </CustomAlertContext.Provider>
  );
}

export default GlobalAlert;
