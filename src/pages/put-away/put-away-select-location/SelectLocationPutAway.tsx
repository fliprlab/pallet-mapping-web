import { Box } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilledBtn from "../../../components/button/FilledBtn";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import SelectLocation from "../../../components/select-location/SelectLocation";

const SelectLocationPutAway = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const setHeader = useHeaderStore((h) => h.setHeader);

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigate(-1),
      lebel: "Select Location (Put Away)",
    });
  }, [navigate, setHeader]);

  return (
    <Box p={"2em"}>
      <SelectLocation onSelectLocation={(location) => setLocation(location)} />
      <FilledBtn
        disabled={location === ""}
        onClick={() => {
          navigate(`/put-away/scan-pallet/${location}`);
        }}
        title="Confirm Details"
      />
    </Box>
  );
};

export default SelectLocationPutAway;
