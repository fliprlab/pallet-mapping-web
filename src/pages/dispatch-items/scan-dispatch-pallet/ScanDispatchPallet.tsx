import React, { useEffect } from "react";
import { Box } from "@mantine/core";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useNavigate } from "react-router-dom";
import KeyEventInput from "../../../components/input/KeyEventInput";
import { api } from "../../../hooks";

const ScanDispatchPallet = () => {
  const navigate = useNavigate();
  const setHeader = useHeaderStore((h) => h.setHeader);
  const { isLoading, mutateAsync } = api.dispatch.mutation.useScanPallet();

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigate("/dashboard"),
      lebel: "Scan Pallet For Dispatch",
    });
  }, [navigate, setHeader]);

  const handleScan = async (scan: string) => {
    if (isLoading) {
      return;
    }
    const res = await mutateAsync({ scan });

    if (res.status === "success") {
      navigate(`/dispatch-items/scan-pallet/${res.data?.pallet_id}`);
    } else {
      customAlert.show({
        message: res.message,
        title: "Failed",
        variant: "error",
      });
    }
  };

  return (
    <Box p={"2em"}>
      <Box mt={"xs"}>
        <KeyEventInput
          placeholder="Enter Pallet Id"
          onEventTrigger={handleScan}
        />
      </Box>

      {/* {palletData && (
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
      )} */}
    </Box>
  );
};

export default ScanDispatchPallet;
