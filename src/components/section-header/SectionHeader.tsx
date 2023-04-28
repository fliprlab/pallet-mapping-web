import { Box, Text, createStyles } from "@mantine/core";
import React, { memo } from "react";
import { COLORS } from "../../colors";

interface IProps {
  title: string;
  flowName: string;
}

const SectionHeader: React.FC<IProps> = ({ title, flowName }) => {
  const { classes } = useStyle();

  return (
    <Box mt={30}>
      <Text className={classes.headingBlack}>{title}</Text>
      <Text className={classes.headingBlue}>{flowName}</Text>
    </Box>
  );
};

export default memo(SectionHeader);

const useStyle = createStyles({
  headingBlack: {
    fontWeight: 700,
    fontSize: 20,
    color: COLORS.black,
    marginLeft: 10,
  },
  headingBlue: {
    fontWeight: 700,
    fontSize: 22,
    color: COLORS.primary,
    marginLeft: 10,
    marginBottom: 20,
  },
});
