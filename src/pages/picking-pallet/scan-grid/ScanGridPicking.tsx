import { Box } from "@mantine/core";
import React, { memo } from "react";

import KeyEventInput from "../../../components/input/KeyEventInput";
import { useNavigate, useParams } from "react-router-dom";
import { usePickUpItemMutation } from "../../../hooks/pick-up/mutation/usePickUpItem.mutation";
import { showNotification } from "@mantine/notifications";

const ScanGridPicking = () => {
  const shipmentId = useParams().shipmentId;
  const navigation = useNavigate();

  const { mutateAsync } = usePickUpItemMutation();

  const pickUpItem = async (gridId: string) => {
    const res = await mutateAsync({
      shipmentId: shipmentId ?? "",
      gridId: gridId,
    });
    if (res.status === "success") {
      showNotification({ message: res.message, color: "green" });
      navigation(-1);
    } else {
      showNotification({ message: res.data.message, color: "red" });
    }
  };

  return (
    <Box p={"2em"}>
      <Box mt={"xs"}>
        <KeyEventInput
          placeholder="Enter Grid Id"
          onEventTrigger={pickUpItem}
        />
      </Box>
    </Box>
  );
};

export default memo(ScanGridPicking);
