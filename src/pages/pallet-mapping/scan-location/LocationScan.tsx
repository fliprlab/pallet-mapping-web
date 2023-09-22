import React, { useEffect } from "react";

import { Box } from "@mantine/core";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useNavigate } from "react-router-dom";
import KeyEventInput from "../../../components/input/KeyEventInput";
import { useScanDestinationMutation } from "../../../hooks/destination/mutation/useDestination.mutation";

const LocationScan = () => {
  const navigate = useNavigate();
  const setHeader = useHeaderStore((h) => h.setHeader);
  const { isLoading, mutateAsync } = useScanDestinationMutation();

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

    const res = await mutateAsync({ scan });

    if (res.status === "success") {
      navigate(`/pallet-mapping/scan-pallet/${res.data}`, { replace: true });
      customAlert.show({
        message: `Scan successfully -- ${scan}`,
        title: "success",
        variant: "success",
      });
    } else {
      customAlert.show({
        message: res.message,
        title: `Failed Scan -- ${scan}`,
        variant: "error",
      });
    }
  };

  return (
    <Box p={"2em"}>
      <Box mt={"xs"}>
        <KeyEventInput
          placeholder="Enter Location"
          onEventTrigger={handleScan}
        />
      </Box>
    </Box>
  );
};

export default LocationScan;
