import { Box } from "@mantine/core";
import React, { useEffect, useMemo } from "react";
import SectionHeader from "../../../components/section-header/SectionHeader";
import Select from "react-select";
import { useGetLocationsQuery } from "../../../hooks/locations/useGetLocations.query";

import { useNavigate } from "react-router-dom";
import FilledBtn from "../../../components/button/FilledBtn";
import { usePickingStore } from "../../../store/usePickingStore";

const SelectLocationPicking = () => {
  const navigate = useNavigate();
  const { locations, setLocations } = usePickingStore((state) => state);
  const { isLoading, data, refetch } = useGetLocationsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

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
      <SectionHeader title="Select Location" flowName="picking-pallet" />
      <Box mt={"xs"}>
        <Select
          isMulti
          placeholder="Select Location"
          options={optionsLocation}
          onChange={(e) => {
            setLocations(e.map((item: any) => item.value));
          }}
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
