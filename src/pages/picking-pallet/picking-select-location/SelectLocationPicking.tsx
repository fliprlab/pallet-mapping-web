import { Box } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { useGetLocationsQuery } from "../../../hooks/locations/useGetLocations.query";

import { useNavigate } from "react-router-dom";
import FilledBtn from "../../../components/button/FilledBtn";
import { usePickingStore } from "../../../store/usePickingStore";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";

const SelectLocationPicking = () => {
  const [focusCount, setFocusCount] = useState(0);
  const navigate = useNavigate();
  const { locations, setLocations } = usePickingStore((state) => state);
  const { isLoading, data, refetch } = useGetLocationsQuery();
  const setHeader = useHeaderStore((h) => h.setHeader);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigate(-1),
      lebel: "Select Location (Picking Shipment)",
    });
  }, []);

  const optionsLocation = useMemo(() => {
    if (!isLoading && data) {
      return data.data.map((item: any) => {
        return { value: item.location, label: item.location };
      });
    } else {
      return [];
    }
  }, [data, isLoading]);

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
        <Select
          isMulti
          placeholder="Select Location"
          options={optionsLocation}
          onChange={(e) => {
            setLocations(e.map((item: any) => item.value));
          }}
          onFocus={() => setFocusCount((e) => e + 1)}
          isSearchable={focusCount > 1}
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
