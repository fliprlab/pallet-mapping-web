import { Box, BoxProps, createStyles } from "@mantine/core";
import React from "react";
import { COLORS } from "../../colors";

const ShadowView: React.FC<{ text: string } & BoxProps> = ({
  text,
  ...props
}) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.root} {...props}>
      <p>{text}</p>
    </Box>
  );
};

export default ShadowView;

const useStyles = createStyles({
  root: {
    border: "1px solid ##909090",
    backgroundColor: "#FCFCFC",
    color: COLORS.black,
    fontWeight: 500,
    fontSize: 16,
    padding: "6px 6px",
    textAlign: "center",
    width: "80%",
    margin: "25px auto",
    boxShadow: "0px 2px 2px 0px #00000040",
    borderRadius: 5,
  },
});
