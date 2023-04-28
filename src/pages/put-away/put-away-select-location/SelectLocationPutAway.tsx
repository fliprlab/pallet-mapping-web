import { Box } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import SectionHeader from "../../../components/section-header/SectionHeader";
import Select from "react-select";
import { useGetLocationsQuery } from "../../../hooks/locations/useGetLocations.query";
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
  }, []);

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
