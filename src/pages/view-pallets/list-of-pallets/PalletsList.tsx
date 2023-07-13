import React, { useEffect, useMemo } from "react";
import { Box, Grid, Loader, createStyles } from "@mantine/core";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useNavigate, useParams } from "react-router-dom";
import KeyEventInput from "../../../components/input/KeyEventInput";
import { useGetLocationPalletsQuery } from "../../../hooks/view-pallet/queries/useGetLocationPallets.query";

const PalletsList = () => {
  const navigate = useNavigate();
  const setHeader = useHeaderStore((h) => h.setHeader);
  const destination: any = useParams().destination;
  const { isLoading, data } = useGetLocationPalletsQuery({
    destination,
  });

  const { classes } = useStyles();

  const pallets: { _id: string }[] = useMemo(() => {
    if (!isLoading && data) {
      return data.data;
    } else {
      return [];
    }
  }, [isLoading, data]);

  useEffect(() => {
    setHeader({
      icon: IMAGES.backArrowIcon,
      iconClick: () => navigate(-1),
      lebel: "List of Pallets",
    });
  }, [navigate, setHeader]);

  return (
    <Box p={"2em"}>
      <Box mt={"xs"}>
        <KeyEventInput
          placeholder="Enter Location"
          onEventTrigger={(e) =>
            navigate(`/view-pallets/list-of-pallets/${e}`, { replace: true })
          }
        />
      </Box>

      <Box my={20} p={15}>
        {isLoading && (
          <Box
            display={"flex"}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <Loader />
          </Box>
        )}
        <Grid gutter={25}>
          {pallets
            ? pallets.map((pallet) => (
                <Grid.Col key={pallet._id} lg={6} xs={6} sm={6} md={6}>
                  <Box
                    onClick={() =>
                      navigate(`/view-pallets/items/${pallet._id}`)
                    }
                    className={classes.palletBox}
                  >
                    <p>{pallet._id}</p>
                  </Box>
                </Grid.Col>
              ))
            : destination && (
                <Box>No Pallet Available For This - {destination}</Box>
              )}
        </Grid>
      </Box>
    </Box>
  );
};

export default PalletsList;

const useStyles = createStyles({
  palletBox: {
    background: "#00BE7A",
    fontSize: 14,
    color: "#fff",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    cursor: "pointer",
    wordBreak: "break-word",
    textAlign: "center",
    minHeight: 85,
    padding: 10,
  },
});
