import React, { useEffect, useMemo } from "react";
import { usePickingStore } from "../../../store/usePickingStore";
import { useGetPickUpItemsQuery } from "../../../hooks/pick-up/query/useGetPickUpItems.query";
import ListCard from "./components/ListCard";
import { Box, Grid } from "@mantine/core";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useNavigate } from "react-router-dom";

const GridListPicking = () => {
  const { locations } = usePickingStore((state) => state);
  const navigate = useNavigate();
  const setHeader = useHeaderStore((h) => h.setHeader);

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigate(-1),
      lebel: "Grid List (Picking Shipment)",
    });
  }, [navigate, setHeader]);

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
      <Box mt={"md"}>
        <Grid>
          {shipments.map((item: any) => {
            return (
              <Grid.Col key={item._id} xs={12} lg={12} md={12}>
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
