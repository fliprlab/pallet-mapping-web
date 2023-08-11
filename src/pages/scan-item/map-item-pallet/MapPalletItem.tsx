import React, { useEffect } from "react";

import { Box } from "@mantine/core";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useNavigate, useParams } from "react-router-dom";
import KeyEventInput from "../../../components/input/KeyEventInput";
import ShadowView from "../../../components/shadow-view/ShadowView";
import { useMapItemPalletMutation } from "../../../hooks/scan-items/mutation/useMapItemPallet.mutation";

const MapPalletItem = () => {
  const navigate = useNavigate();
  const setHeader = useHeaderStore((h) => h.setHeader);

  const { location, itemId, zone, lpst } = useParams();

  const { isLoading, mutateAsync } = useMapItemPalletMutation();

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigate(-1),
      lebel: "Scan Pallet",
    });
  }, [navigate, setHeader]);

  const handleScan = async (pallet: string) => {
    if (isLoading) {
      return;
    }
    const res = await mutateAsync({
      location: location ?? "",
      zone: zone ?? "",
      palletId: pallet,
      itemId: itemId ?? "",
    });

    if (res.status === "success") {
      customAlert.show({
        message: res.message,
        title: res.title,
        variant: "success",
      });
      navigate("/scan-items", { replace: true });
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
      <Box style={{ textAlign: "right" }}>
        <ShadowView
          style={{ minWidth: 150, width: "auto", display: "inline-block" }}
          text={location ?? ""}
        />
      </Box>
      <Box my={"xs"}>
        <KeyEventInput
          placeholder="Enter Pallet Id"
          onEventTrigger={(e) => {
            handleScan(e);
          }}
        />
      </Box>
      <Box
        style={{
          textAlign: "right",
          flexDirection: "column",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <ShadowView
          style={{
            minWidth: 150,
            width: "auto",

            margin: "10px ",
          }}
          text={zone ?? ""}
        />
        <ShadowView
          style={{
            minWidth: 150,
            width: "auto",

            margin: "10px ",
          }}
          text={lpst ?? ""}
        />
      </Box>
    </Box>
  );
};

export default MapPalletItem;
