import { Box } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import SectionHeader from "../../../components/section-header/SectionHeader";
import Select from "react-select";
import { useGetLocationsQuery } from "../../../hooks/locations/useGetLocations.query";

import { useNavigate } from "react-router-dom";
import FilledBtn from "../../../components/button/FilledBtn";

const SelectLocationPutAway = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
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
      <SectionHeader title="Select Location" flowName="put-away" />
      <Box mt={"xs"}>
        <Select
          placeholder="Select Location"
          options={optionsLocation}
          onChange={(e: any) => {
            setLocation(e.value);
          }}
        />
      </Box>
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
