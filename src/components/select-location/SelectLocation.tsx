import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const [focusCount, setFocusCount] = useState(0);
  const { isLoading, data, refetch } = useGetLocationsQuery();
  const [inputValue, setInputValue] = useState("");
  const selectRef = useRef(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const optionsLocation: { value: string; label: string }[] = useMemo(() => {
    if (!isLoading && data) {
      return data.data.map((item: any) => {
        return { value: item.location, label: item.location };
      });
    } else {
      return [];
    }
  }, [data, isLoading]);

  const selectedValue = optionsLocation.filter((op) => {
    const valueUpper = op.value.toUpperCase();
    const inputValueUpper = inputValue.toUpperCase();
    return valueUpper == inputValueUpper;
  });

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
          ref={selectRef}
          options={optionsLocation}
          value={selectedValue}
          onInputChange={(inputValue, action) => {
            if (action.action == "menu-close" && action.prevInputValue != "") {
              setInputValue(action.prevInputValue);
              onSelectLocation(action.prevInputValue);
              customAlert.show({
                title: "Selected Location",
                message: "Location Selected " + action.prevInputValue,
                variant: "success",
              });
            }
          }}
          onFocus={() => setFocusCount((e) => e + 1)}
          isSearchable={true}
        />
      </Box>
    </React.Fragment>
  );
};

export default SelectLocation;
