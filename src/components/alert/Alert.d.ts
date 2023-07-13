type GlobalAlertOb = {
  show: (alertMessage: AlertMessage) => void;
};
type AlertMessage = {
  title: string;
  message: string;
  okTitle?: string;
  cancleTitle?: string;
  okCallBack?: Function;
  cancelCallback?: Function;
  disabled?: boolean;
  showButtons?: boolean;
  textAlign?: "justify" | "center";
  variant: "error" | "success";
};

type AlertModalProps = {
  alertData: AlertMessage;
  showAlert: boolean;
  setShowAlert: Function;
};

declare var customAlert: GlobalAlertOb;
