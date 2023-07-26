import React, { useEffect, useMemo } from "react";
import { IMAGES } from "../../images";
import { Box } from "@mantine/core";
import SectionHeader from "../section-header/SectionHeader";
import { useGetLocationsQuery } from "../../hooks/locations/useGetLocations.query";
import Select from "react-dropdown-select";

interface Props {
  onSelectMultiLocation: (location: string[]) => void;
}

type TOptions = {
  value: string;
  label: string;
};

const SelectLocationV2Multi = (props: Props) => {
  const { onSelectMultiLocation } = props;
  const { isLoading, data, refetch } = useGetLocationsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const optionsLocation: TOptions[] = useMemo(() => {
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
          multi={true}
          placeholder="Select Location"
          options={optionsLocation}
          values={[]}
          onChange={(option) => {
            console.log("onChange called ", option);
            const values = option.map((op) => op.value);
            onSelectMultiLocation(values);
          }}
          autoFocus={true}
          handleKeyDownFn={(props) => {
            const { event, state, methods, setState } = props;
            if (event.key === "Enter") {
              console.log("Props ", props);
              // find in the searchResults
              const find = methods
                .searchResults()
                .filter(
                  (op) => op.value.toUpperCase() === state.search.toUpperCase()
                );
              if (find.length > 0) {
                state.values.push(...find);

                const unique = state.values.filter(
                  (value, index, array) => array.indexOf(value) === index
                );

                setState({
                  values: unique,
                  search: "",
                  dropdown: false,
                });
              } else {
                customAlert.show({
                  title: "Invalid",
                  message: `"${state.search}" Location Not Found`,
                  variant: "error",
                });
              }
            }
          }}
        />
      </Box>
    </React.Fragment>
  );
};

export default SelectLocationV2Multi;
