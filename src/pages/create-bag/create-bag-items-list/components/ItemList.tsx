import { Flex, Text } from "@mantine/core";
import React, { memo } from "react";
import { ICONS } from "../../../../icons";

interface IProps {
  trashClick: () => void;
  shipmentId: string;
}

const ItemList: React.FC<IProps> = ({ shipmentId, trashClick }) => {
  return (
    <Flex
      sx={{ background: "#F9F9F9", borderRadius: 5 }}
      py={12}
      px={15}
      justify={"space-between"}
      align={"center"}
      mb={12}
    >
      <Text color="#373737" size={12}>
        Shipment ID - {shipmentId}
      </Text>
      <img
        onClick={trashClick}
        src={ICONS.trash}
        width="16px"
        alt="Trash Icon"
        style={{ cursor: "pointer" }}
      />
    </Flex>
  );
};

export default memo(ItemList);
