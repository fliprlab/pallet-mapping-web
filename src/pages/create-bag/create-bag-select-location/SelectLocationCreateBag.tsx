import { Box } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilledBtn from "../../../components/button/FilledBtn";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import SelectLocation from "../../../components/select-location/SelectLocation";
import { useShipmentsStore } from "../../../store/shipmentsStore";

const SelectLocationCreateBag = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const { clearStore } = useShipmentsStore((state) => state);
  const setHeader = useHeaderStore((h) => h.setHeader);

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigate(-1),
      lebel: "Select Location (Create Bag)",
    });
  }, []);

  return (
    <Box p={"2em"}>
      <SelectLocation onSelectLocation={(location) => setLocation(location)} />
      <FilledBtn
        disabled={location === ""}
        onClick={() => {
          clearStore();
          navigate(`/create-bag/scan-pallet/${location}`);
        }}
        title="Confirm Details"
      />
    </Box>
  );
};

export default SelectLocationCreateBag;
