import React, { useEffect } from "react";

import { Box } from "@mantine/core";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useNavigate } from "react-router-dom";

import FilledBtn from "../../../components/button/FilledBtn";

const MapPallet = () => {
  const navigate = useNavigate();
  const setHeader = useHeaderStore((h) => h.setHeader);

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigate("/dashboard"),
      lebel: "Back",
    });
  }, [navigate, setHeader]);

  return (
    <Box p={"2em"}>
      <Box my={35}>
        <FilledBtn
          title="Create New"
          onClick={() => navigate("/pallet-mapping/scan-location")}
        />
      </Box>
      <Box my={35}>
        <FilledBtn
          title="View Pallet List"
          onClick={() => navigate("/view-pallets/list-of-pallets")}
        />
      </Box>
    </Box>
  );
};

export default MapPallet;
