import React, { useEffect, useMemo } from "react";
import { usePickingStore } from "../../../store/usePickingStore";
import { useGetPickUpItemsQuery } from "../../../hooks/pick-up/query/useGetPickUpItems.query";
import ListCard from "./components/ListCard";
import { Box, Grid } from "@mantine/core";
import SectionHeader from "../../../components/section-header/SectionHeader";

const GridListPicking = () => {
  const { locations } = usePickingStore((state) => state);
  const { isLoading, data, refetch } = useGetPickUpItemsQuery({
    locations: locations,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const shipments: any[] = useMemo(() => {
    if (!isLoading && data) {
      return data.data;
    } else {
      return [];
    }
  }, [data, isLoading]);

  return (
    <Box p={"2em"}>
      <SectionHeader title="Grid List" flowName="Picking-pallet" />
      <Box mt={"md"}>
        <Grid>
          {shipments.map((item: any) => {
            return (
              <Grid.Col key={item._id} sm={3} xs={6}>
                <ListCard item={item} />
              </Grid.Col>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default GridListPicking;
