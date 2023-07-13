import { Box, Button, Flex, Modal, Text, createStyles } from "@mantine/core";

import React, { memo } from "react";
import { COLORS } from "../../colors";

const CustomAlertModal = (props: AlertModalProps) => {
  const { alertData, setShowAlert, showAlert } = props;
  const { classes } = useStyles();

  return (
    <Modal
      closeOnClickOutside={false}
      radius={"md"}
      opened={showAlert}
      onClose={() => setShowAlert(!showAlert)}
      centered
      size={400}
      withCloseButton={false}
    >
      <Box p={10}>
        <Box mb={30}>
          <Text
            weight={500}
            align="center"
            color={alertData.variant === "error" ? COLORS.red : COLORS.success}
            size={16}
          >
            {alertData.title}
          </Text>
          <Text mt={15} weight={400} align="center" color={"#646464"} size={12}>
            {alertData.message}
          </Text>
        </Box>
        <Flex align={"center"} justify={"center"}>
          <Button
            onClick={() => {
              if (alertData.okCallBack) {
                alertData.okCallBack();
              } else {
                setShowAlert(false);
              }
            }}
            className={classes.root}
            styles={{ leftIcon: { marginRight: 4 } }}
          >
            OK
          </Button>

          {alertData.cancleTitle && (
            <Button
              onClick={() => {
                setShowAlert(false);
              }}
              className={classes.cancelBtn}
              styles={{ leftIcon: { marginRight: 4 } }}
            >
              Cancel
            </Button>
          )}
        </Flex>
      </Box>
    </Modal>
  );
};

export default memo(CustomAlertModal);

const useStyles = createStyles({
  root: {
    borderColor: "#007DC2",
    backgroundColor: "#007DC2",
    color: COLORS.white,
    fontWeight: 600,
    fontSize: 14,
    padding: "6px 6px",
    margin: "0px 10px",
    height: "auto",
    minWidth: 75,
    "&:hover": {
      backgroundColor: "#007DC2",
    },
    "&:focus-visible": {
      outline: "none",
    },
  },

  cancelBtn: {
    borderColor: "#E71F19",
    backgroundColor: "#E71F19",
    color: COLORS.white,
    fontWeight: 600,
    fontSize: 14,
    padding: "6px 6px",
    margin: "0px 10px",
    height: "auto",
    minWidth: 75,
    "&:hover": {
      backgroundColor: "#E71F19",
    },
    "&:focus-visible": {
      outline: "none",
    },
  },
});
