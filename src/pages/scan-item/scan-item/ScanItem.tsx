import React, { useEffect } from "react";

import { Box } from "@mantine/core";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useNavigate } from "react-router-dom";
import KeyEventInput from "../../../components/input/KeyEventInput";
import { useScanItemMutation } from "../../../hooks/scan-items/mutation/useScanItem.mutation";

const ScanItem = () => {
  const navigate = useNavigate();
  const setHeader = useHeaderStore((h) => h.setHeader);
  const { isLoading, mutateAsync } = useScanItemMutation();

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigate("/dashboard"),
      lebel: "Scan Items",
    });
  }, [navigate, setHeader]);

  const handleScan = async (scan: string) => {
    if (isLoading) {
      return;
    }
    const res = await mutateAsync({ scan });

    if (res.status === "success") {
      navigate(
        `/scan-items/scan-pallet/${res.data.location}/${res.data.itemId}/${res.data.zone}/${res.data.lpst}`
      );
    } else {
      customAlert.show({
        message: res.data.message,
        title: res.data.title,
        variant: "error",
      });
    }
  };

  return (
    <Box p={"2em"}>
      <Box mt={"xs"}>
        <KeyEventInput placeholder="Scan Items" onEventTrigger={handleScan} />
      </Box>
    </Box>
  );
};

export default ScanItem;
