import { Box, Text } from "@mantine/core";
import React, { memo } from "react";

interface IProps {
  palletId: string;
}

const NeesConFirmationDetails: React.FC<IProps> = ({ palletId }) => {
  return (
    <Box>
      <Text color="#9A9A9A" size={12} weight={600} align="center">
        Pallet ID: {palletId}
      </Text>
      <Text color="#9A9A9A" size={14} align="center">
        Pallet ID is already used somewhere
      </Text>
      <Text color="#606060" size={14} weight={500} align="center">
        Do you want to use this pallet again?
      </Text>
    </Box>
  );
};

export default memo(NeesConFirmationDetails);
