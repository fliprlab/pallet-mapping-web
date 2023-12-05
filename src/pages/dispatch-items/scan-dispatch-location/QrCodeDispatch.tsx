import React from "react";
import { Box, Flex, Text } from "@mantine/core";
import Items from "./Items";
import QrCode from "../../../components/qr-code/QrCode";

interface Props {
  qrCodeData: string;
  palletName: string;
  virtualId: string;
  items: any[];
  itemTitle: string;
}

function QrCodeDispatch(props: Props) {
  const { items, palletName, qrCodeData, virtualId, itemTitle } = props;
  return (
    <Flex justify={"center"} align={"center"} direction={"column"}>
      <Box id="qrCodeBlock" p={"sm"}>
        <QrCode size={200} value={qrCodeData} />
        <Text size={12} weight={400} color="#373737" mt={10} align="center">
          Pallet Id :- {palletName}
        </Text>
        <Text size={15} weight={700} color="#373737" mt={10} align="center">
          Virtual Id :- {virtualId}
        </Text>
      </Box>
      <Items title={itemTitle} items={items} />
    </Flex>
  );
}

export default QrCodeDispatch;
