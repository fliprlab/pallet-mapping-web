import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@mantine/core";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useNavigate, useParams } from "react-router-dom";
import KeyEventInput from "../../../components/input/KeyEventInput";
import { api } from "../../../hooks";
import QrCode from "../../../components/qr-code/QrCode";

const ScanDispatchLocation = () => {
  const navigate = useNavigate();
  const { palletId } = useParams();
  const setHeader = useHeaderStore((h) => h.setHeader);
  const { isLoading, mutateAsync } = api.dispatch.mutation.useScanLocation();
  const [dispatchData, setDispatchData] = useState<{
    qrCodeData: string;
    palletName: string;
    virtualId: string;
  }>();

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigate(-1),
      lebel: "Scan Location",
    });
  }, [navigate, setHeader]);

  const handleScan = async (scan: string) => {
    if (isLoading) {
      return;
    }
    const res = await mutateAsync({ scan, pallet: palletId || "" });

    if (res.status === "success") {
      setDispatchData(res.data);
      setHeader({
        icon: IMAGES.backArrowIcon,
        iconClick: () => navigate(-1),
        lebel: "Dispatch QR-CODE",
      });
    } else {
      customAlert.show({
        message: res.message,
        title: res.title,
        variant: "error",
      });
    }
  };

  return (
    <Box p={"2em"}>
      {!dispatchData ? (
        <Box mt={"xs"}>
          <KeyEventInput
            placeholder="Scan Location"
            onEventTrigger={handleScan}
          />
        </Box>
      ) : (
        <Flex justify={"center"} align={"center"} direction={"column"}>
          <Box id="qrCodeBlock" p={"sm"}>
            <QrCode size={200} value={dispatchData.qrCodeData} />
            <Text size={12} weight={400} color="#373737" mt={10} align="center">
              Pallet Id :- {dispatchData.palletName}
            </Text>
            <Text size={15} weight={700} color="#373737" mt={10} align="center">
              Virtual Id :- {dispatchData.virtualId}
            </Text>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default ScanDispatchLocation;
