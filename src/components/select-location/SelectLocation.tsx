import React, { useEffect, useMemo, useState } from "react";
import { IMAGES } from "../../images";
import { Box } from "@mantine/core";
import SectionHeader from "../section-header/SectionHeader";
import Select from "react-select";
import { useGetLocationsQuery } from "../../hooks/locations/useGetLocations.query";

interface Props {
  onSelectLocation: (location: string) => void;
}

const SelectLocation = (props: Props) => {
  const { onSelectLocation } = props;

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
    <React.Fragment>
      <img
        src={IMAGES.selectLocation}
        alt="location"
        style={{ width: "100%", maxWidth: "289px" }}
      />
      <Box mt={"xs"}>
        <SectionHeader title="SELECT YOUR" flowName="LOCATION" />
        <Select
          placeholder="Select Location"
          options={optionsLocation}
          onChange={(e: any) => {
            onSelectLocation(e.value);
          }}
        />
      </Box>
    </React.Fragment>
  );
};

export default SelectLocation;
