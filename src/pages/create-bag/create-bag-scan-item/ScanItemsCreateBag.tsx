import React, { memo, useEffect, useState } from "react";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@mantine/core";
import KeyEventInput from "../../../components/input/KeyEventInput";
import { useShipmentsStore } from "../../../store/shipmentsStore";
import { showNotification } from "@mantine/notifications";
import FilledBtn from "../../../components/button/FilledBtn";

const ScanItemsCreateBag = () => {
  const navigation = useNavigate();
  const [itemId, setItemId] = useState("");
  const setHeader = useHeaderStore((h) => h.setHeader);
  const { shipments, addShipment } = useShipmentsStore((state) => state);
  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigation(-1),
      lebel: "Scan Item (Create Bag)",
    });
  }, []);

  const addShipments = (e: string) => {
    const PALLET_ITEM = /^[A-Z]{4}[0-9]{10}$/;
    const test = PALLET_ITEM.test(e);

    if (test) {
      const alreadyExists = shipments.findIndex((item) => item === e);

      if (alreadyExists > -1) {
        setTimeout(() => {
          setItemId("");
        }, 10);
        showNotification({ message: "Shipment Already Exists", color: "red" });
      } else {
        addShipment(e);
        showNotification({
          message: `Shipment Added :- ${e}`,
          color: "green",
        });
        setTimeout(() => {
          setItemId("");
        }, 2000);
      }
    } else {
      setTimeout(() => {
        setItemId("");
      }, 10);
      showNotification({ message: "Invalid Shipment Id", color: "red" });
    }
  };

  return (
    <Box p={"2em"}>
      <Box mt={"xs"}>
        <KeyEventInput
          placeholder="Enter Pallet Id"
          onEventTrigger={(e) => {
            addShipments(e);
            setItemId(e);
          }}
        />
      </Box>
      <Text weight={500} my={"md"} align="center">
        Item Id :- {itemId}
      </Text>
      <FilledBtn
        title="Show Items List"
        onClick={() => {
          navigation(-1);
        }}
      />
    </Box>
  );
};

export default memo(ScanItemsCreateBag);
