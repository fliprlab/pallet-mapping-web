import { Box } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilledBtn from "../../../components/button/FilledBtn";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import SelectLocationV2 from "../../../components/select-location/SelectLocationV2";

const SelectLocationCreateBag = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const setHeader = useHeaderStore((h) => h.setHeader);

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigate(-1),
      lebel: "Select Location (Create Bag)",
    });
  }, [navigate, setHeader]);

  return (
    <Box p={"2em"}>
      <SelectLocationV2
        onSelectLocation={(location) => setLocation(location)}
      />
      <FilledBtn
        disabled={location === ""}
        onClick={() => {
          navigate(`/create-bag/scan-pallet/${location}`);
        }}
        title="Confirm Details"
      />
    </Box>
  );
};

export default SelectLocationCreateBag;
