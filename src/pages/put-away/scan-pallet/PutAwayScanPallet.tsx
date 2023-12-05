import { Box } from "@mantine/core";
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KeyEventInput, {
  IKeyKeyEventInputRef,
} from "../../../components/input/KeyEventInput";
import { useGridCheckValidPalletMutation } from "../../../hooks/put-away/useGridCheckValidPallet.mutation";
import { showNotification } from "@mantine/notifications";

const PutAwayScanPallet = () => {
  const navigation = useNavigate();
  const location = useParams().location;
  const inputRef = useRef<IKeyKeyEventInputRef>(null);

  useEffect(() => {
    if (location === "") {
      navigation("/put-away/select-location");
    }
  }, [location, navigation]);

  const { mutateAsync } = useGridCheckValidPalletMutation();

  const scanPallet = async (palletId: string) => {
    const res = await mutateAsync({ palletId, location: location ?? "" });
    if (res.status === "success") {
      navigation(`/put-away/scan-grid/${location}/${palletId}`);
    } else {
      showNotification({
        message: res.data.message,
        color: "red",
      });
      inputRef.current?.focus();
    }
  };

  return (
    <Box p={"2em"}>
      <Box mt={"xs"}>
        <KeyEventInput
          ref={inputRef}
          placeholder="Enter Pallet Id"
          onEventTrigger={scanPallet}
        />
      </Box>
      {/* <Text weight={500} my={"md"} align="center">
        Pallet Id :- {palletId}
      </Text> */}
    </Box>
  );
};

export default PutAwayScanPallet;
