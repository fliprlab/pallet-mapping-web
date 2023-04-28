import { Box, Button, Flex, Modal, Text, createStyles } from "@mantine/core";
import React, {
  memo,
  useState,
  ReactNode,
  useImperativeHandle,
  ForwardedRef,
  forwardRef,
  useCallback,
} from "react";

interface IProps {
  children: ReactNode;
  title: string;
  size?: number;
  type?: "success" | "error";
  oKBtn: { title?: string; onClick: () => void };
  noCallback?: () => void;
}

export interface IConfirmationModalRef {
  toggleModal: () => void;
}

const ConfirmationModal = (
  props: IProps,
  ref: ForwardedRef<IConfirmationModalRef>
) => {
  const { classes } = styles();
  const {
    children,
    title,
    size = 612,
    type = "success",
    oKBtn,
    noCallback,
  } = props;
  const [show, setShow] = useState(false);

  const toggleModal = useCallback(() => setShow((value) => !value), []);
  useImperativeHandle(
    ref,
    () => {
      return { toggleModal };
    },
    [toggleModal]
  );

  return (
    <Modal
      opened={show}
      onClose={() => {
        toggleModal();
      }}
      withCloseButton={false}
      centered
      size={size}
    >
      <Box px={0} py={32}>
        <Box mb={25}>
          <Text
            color={type === "success" ? "#007DC2" : "#E71F19"}
            size={16}
            weight={700}
            align="center"
          >
            {title}
          </Text>
        </Box>
        {children}
        <Flex justify={"center"} mt={25}>
          <Button
            className={classes.btn}
            variant="filled"
            onClick={oKBtn.onClick}
            sx={{
              backgroundColor: "#007DC2",
              "&:hover": { backgroundColor: "#007DC2" },
            }}
          >
            {oKBtn.title ?? "YES"}
          </Button>
          {noCallback && (
            <Button
              className={classes.btn}
              variant="filled"
              onClick={noCallback}
              sx={{
                backgroundColor: "#E71F19",
                "&:hover": { backgroundColor: "#E71F19" },
              }}
            >
              No
            </Button>
          )}
        </Flex>
      </Box>
    </Modal>
  );
};

export default memo(forwardRef(ConfirmationModal));

const styles = createStyles({
  btn: {
    padding: "6px 22px",
    height: "auto",
    fontWeight: 700,
    fontSize: 14,
    margin: "0px 19px",
  },
});
