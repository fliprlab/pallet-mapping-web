import React, { useState, useEffect } from "react";
import QrCode from "../../../components/qr-code/QrCode";
import { useShipmentsStore } from "../../../store/shipmentsStore";
import { createQrData } from "../../../helpers/createQrData";
import { Box, Flex, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import FilledBtn from "../../../components/button/FilledBtn";
import { downloadQrCode } from "../../../helpers/downloadQrCode";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";

const QrCodeScreenCreateBag = () => {
  const { palletId, virtualId } = useParams();
  const [loading, setLoading] = useState(false);
  const { shipments, clearStore } = useShipmentsStore((state) => state);
  const setHeader = useHeaderStore((h) => h.setHeader);
  const navigation = useNavigate();

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigation(-1),
      lebel: ` (Create Bag)`,
    });
  }, []);

  return (
    <Box mt={60}>
      <Flex justify={"center"} align={"center"} direction={"column"}>
        <Box id="qrCodeBlock" p={"sm"}>
          <QrCode size={200} value={createQrData(shipments)} />
          <Text size={14} weight={700} color="#373737" mt={28} align="center">
            Pallet Id :- {palletId}
          </Text>
          <Text size={14} weight={700} color="#373737" mt={28} align="center">
            Virtual Id :- {virtualId}
          </Text>
        </Box>
      </Flex>
      <Box px={"md"} mt={100}>
        <FilledBtn
          title="Download QR Code"
          onClick={() => {
            downloadQrCode({
              id: "qrCodeBlock",
              loading: setLoading,
              fileName: virtualId ?? "qrcode",
            });
          }}
          loading={loading}
        />
        <FilledBtn
          title="Scan New Bags"
          onClick={() => {
            clearStore();
            navigation(-3);
          }}
        />
      </Box>
    </Box>
  );
};

export default QrCodeScreenCreateBag;
