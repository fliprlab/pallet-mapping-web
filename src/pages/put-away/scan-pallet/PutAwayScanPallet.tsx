import { Box, Text } from "@mantine/core";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KeyEventInput, {
  IKeyKeyEventInputRef,
} from "../../../components/input/KeyEventInput";
import FilledBtn from "../../../components/button/FilledBtn";
import { useGridCheckValidPalletMutation } from "../../../hooks/put-away/useGridCheckValidPallet.mutation";
import { showNotification } from "@mantine/notifications";

const PutAwayScanPallet = () => {
  const navigation = useNavigate();
  const location = useParams().location;
  const [palletId, setPalletId] = useState("");
  const inputRef = useRef<IKeyKeyEventInputRef>(null);

  useEffect(() => {
    if (location === "") {
      navigation("/put-away/select-location");
    }
  }, [location, navigation]);

  const { isLoading, mutateAsync } = useGridCheckValidPalletMutation();

  const checkValidPallet = async () => {
    const res = await mutateAsync({ palletId, location: location ?? "" });
    if (res.status === "success") {
      navigation(`/put-away/scan-grid/${location}/${palletId}`);
    } else {
      showNotification({
        message: res.data.message,
        color: "red",
      });
      setPalletId("");
      inputRef.current?.focus();
    }
  };

  return (
    <Box p={"2em"}>
      <Box mt={"xs"}>
        <KeyEventInput
          ref={inputRef}
          placeholder="Enter Pallet Id"
          onEventTrigger={setPalletId}
        />
      </Box>
      <Text weight={500} my={"md"} align="center">
        Pallet Id :- {palletId}
      </Text>
      <FilledBtn
        title="Scan Grid"
        onClick={checkValidPallet}
        disabled={palletId === ""}
        loading={isLoading}
      />
    </Box>
  );
};

export default PutAwayScanPallet;
