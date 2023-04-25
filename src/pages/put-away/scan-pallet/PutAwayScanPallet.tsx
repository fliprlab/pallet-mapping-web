import { Box, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionHeader from "../../../components/section-header/SectionHeader";
import KeyEventInput from "../../../components/input/KeyEventInput";
import FilledBtn from "../../../components/button/FilledBtn";
import { useGridCheckValidPalletMutation } from "../../../hooks/put-away/useGridCheckValidPallet.mutation";
import { showNotification } from "@mantine/notifications";

const PutAwayScanPallet = () => {
  const navigation = useNavigate();
  const location = useParams().location;
  const [palletId, setPalletId] = useState("");

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
    }
  };

  return (
    <Box p={"2em"}>
      <SectionHeader title="Scan Pallet" flowName="put-away" />
      <Box mt={"xs"}>
        <KeyEventInput
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
