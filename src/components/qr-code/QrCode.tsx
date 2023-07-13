import { Box, createStyles } from "@mantine/core";
import React, { memo } from "react";
import ViewQRCode from "react-qr-code";

interface IProps {
  value: string;
  size?: number;
}

const QrCode: React.FC<IProps> = ({ value, size }) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.root}>
      <ViewQRCode size={size} value={value} />
    </Box>
  );
};

export default memo(QrCode);

const useStyles = createStyles({
  root: {
    border: "1px solid #EEEEEE",
    padding: 35,
  },
});
