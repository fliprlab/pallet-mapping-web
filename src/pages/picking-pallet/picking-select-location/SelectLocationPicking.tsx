import { Box } from "@mantine/core";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilledBtn from "../../../components/button/FilledBtn";
import { usePickingStore } from "../../../store/usePickingStore";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import SelectLocationV2Multi from "../../../components/select-location/SelectLocationV2Multi";

const SelectLocationPicking = () => {
  const navigate = useNavigate();
  const { locations, setLocations } = usePickingStore((state) => state);
  const setHeader = useHeaderStore((h) => h.setHeader);

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigate(-1),
      lebel: "Select Location (Picking Shipment)",
    });
  }, [navigate, setHeader]);

  return (
    <Box p={"2em"}>
      <Box>
        <img
          src={IMAGES.selectLocation}
          alt="location"
          style={{ width: "100%", maxWidth: "289px" }}
        />
      </Box>
      <Box mt={"xs"}>
        <SelectLocationV2Multi
          onSelectMultiLocation={(locations) => setLocations(locations)}
        />
      </Box>
      <FilledBtn
        disabled={locations.length === 0}
        onClick={() => {
          navigate(`/picking/grid-list`);
        }}
        title="Confirm Details"
      />
    </Box>
  );
};

export default SelectLocationPicking;
