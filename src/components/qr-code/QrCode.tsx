import React, { memo } from "react";
import ViewQRCode from "react-qr-code";

interface IProps {
  value: string;
  size?: number;
}

const QrCode: React.FC<IProps> = ({ value, size }) => {
  return <ViewQRCode size={size} value={value} />;
};

export default memo(QrCode);
