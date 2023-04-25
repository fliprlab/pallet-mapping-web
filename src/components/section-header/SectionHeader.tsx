import { Box, Text } from "@mantine/core";
import React, { memo } from "react";

interface IProps {
  title: string;
  flowName: string;
}

const SectionHeader: React.FC<IProps> = ({ title, flowName }) => {
  return (
    <Box>
      <Text weight={500} size={20}>
        {title}
        <span
          style={{
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: 16,
            marginLeft: 10,
          }}
        >{`(${flowName})`}</span>
      </Text>
    </Box>
  );
};

export default memo(SectionHeader);
