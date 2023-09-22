import React, { useEffect, useState } from "react";

import { Box } from "@mantine/core";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useNavigate, useParams } from "react-router-dom";
import KeyEventInput from "../../../components/input/KeyEventInput";
import ShadowView from "../../../components/shadow-view/ShadowView";

import { useScanPalletMutation } from "../../../hooks/pallet-mapping/mutation/useScanPallet.mutation";

const ScanPallet = () => {
  const navigate = useNavigate();
  const setHeader = useHeaderStore((h) => h.setHeader);
  const location = useParams().location;
  const [palletId, setPalletId] = useState("");
  const { isLoading, mutateAsync } = useScanPalletMutation();
  const [scanString, setScanString] = useState("");

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () =>
        navigate("/pallet-mapping/scan-location", { replace: true }),
      lebel: "Scan Pallet",
    });
  }, [navigate, setHeader]);

  const handleScan = async (pallet: string) => {
    if (isLoading) {
      return;
    }
    setScanString(pallet + "||" + scanString);
    const res = await mutateAsync({
      location: location ?? "",
      palletId: pallet,
    });

    if (res.status === "success") {
      customAlert.show({
        message: res.message,
        title: res.title,
        variant: "success",
      });
      // navigate("/pallet-mapping", { replace: true });
    } else {
      customAlert.show({
        message: `${res.data.message} Pallet -- ${pallet}`,
        title: res.data.title,
        variant: "error",
      });
    }
  };

  return (
    <Box p={"2em"}>
      <Box mt={"xs"}>
        <KeyEventInput
          placeholder="Enter Pallet Id"
          onEventTrigger={(e) => {
            handleScan(e);
            setPalletId(e);
          }}
        />
      </Box>

      <ShadowView text={location ?? ""} />
      {palletId && <ShadowView text={palletId} />}
      <p>{scanString}</p>
    </Box>
  );
};

export default ScanPallet;
