import React, { useEffect, useMemo } from "react";

import { Box, Flex, Text } from "@mantine/core";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useNavigate, useParams } from "react-router-dom";
import KeyEventInput from "../../../components/input/KeyEventInput";
import { useDispatchPalletItemsQuery } from "../../../hooks/dispatch-items/query/useDispatchPalletItems.query";
import QrCode from "../../../components/qr-code/QrCode";

const ScanDispatchPallet = () => {
  const navigate = useNavigate();
  const setHeader = useHeaderStore((h) => h.setHeader);

  const pallet: any = useParams().palletId;

  const { isLoading, data, refetch } = useDispatchPalletItemsQuery({
    scan: pallet,
  });

  const palletData: { qrCodeData: string; virtualId: string } = useMemo(() => {
    if (!isLoading && data && data.status === "success") {
      return data.data;
    } else if (data && data.data.status === "error") {
      navigate("/dispatch-items/scan-pallet", { replace: true });
      customAlert.show({
        variant: "error",
        title: data?.data.title,
        message: data?.data.message,
      });
    }
  }, [isLoading, data, navigate]);

  useEffect(() => {
    if (pallet) {
      refetch();
    }
  }, [pallet, refetch]);

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () =>
        navigate(pallet ? "/dispatch-items/scan-pallet" : "/dashboard"),
      lebel: "Scan Pallet",
    });
  }, [navigate, setHeader, pallet]);

  return (
    <Box p={"2em"}>
      {!pallet && (
        <Box mt={"xs"}>
          <KeyEventInput
            placeholder="Enter Pallet Id"
            onEventTrigger={(e) => {
              navigate(`/dispatch-items/scan-pallet/${e}`);
            }}
          />
        </Box>
      )}

      {palletData && (
        <Flex justify={"center"} align={"center"} direction={"column"}>
          <Box id="qrCodeBlock" p={"sm"}>
            <QrCode size={200} value={palletData.qrCodeData} />
            <Text size={12} weight={400} color="#373737" mt={10} align="center">
              Pallet Id :- {pallet}
            </Text>
            <Text size={15} weight={700} color="#373737" mt={10} align="center">
              Virtual Id :- {palletData.virtualId}
            </Text>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default ScanDispatchPallet;
