import { Box, Grid } from "@mantine/core";
import React, { useEffect } from "react";
import FlowCard from "./components/FlowCard";
import { IMAGES } from "../../images";
import { useNavigate } from "react-router-dom";
import { useHeaderStore } from "../../store/headerStore";
import { logoutUser } from "../../services/authenticate.service";

const Dashboard = () => {
  const navigate = useNavigate();
  const setHeader = useHeaderStore((h) => h.setHeader);

  useEffect(() => {
    setHeader({
      icon: IMAGES.logOutIcon,
      iconClick: logoutUser,
      lebel: "Pallet Mapping",
    });
  }, [setHeader]);

  return (
    <Box p={"2em"}>
      <Box sx={{ marginBottom: "2em" }}>
        <Grid>
          <Grid.Col sm={12}>
            <FlowCard
              btnTitle="MAP NOW"
              cardTitleOne="PALLET"
              cardTitleSecond="MAPPING"
              color="#e55852"
              onClick={() => {
                navigate("/pallet-mapping");
              }}
              image={IMAGES.scanShipment}
            />
          </Grid.Col>
          <Grid.Col sm={12}>
            <FlowCard
              btnTitle="CREATE"
              cardTitleOne="Create"
              cardTitleSecond="Bag"
              color="#f0903c"
              onClick={() => {
                navigate("/scan-items");
              }}
              image={IMAGES.createBag}
            />
          </Grid.Col>
          <Grid.Col sm={12}>
            <FlowCard
              btnTitle="put away"
              cardTitleOne="Pallet put"
              cardTitleSecond="away."
              color="#cd4e01"
              onClick={() => {
                navigate("/put-away/select-location");
              }}
              image={IMAGES.putAway}
            />
          </Grid.Col>
          <Grid.Col sm={12}>
            <FlowCard
              image={IMAGES.pickingShipment}
              btnTitle="Pick up"
              cardTitleOne="Pallet"
              cardTitleSecond="Picking"
              color="#8d7020"
              onClick={() => {
                navigate("/picking/select-location");
              }}
            />
          </Grid.Col>
          <Grid.Col sm={12}>
            <FlowCard
              image={IMAGES.dispatchItems}
              btnTitle="DISPATCH"
              cardTitleOne="DISPATCH"
              cardTitleSecond="ITEMS"
              color="#fc4669"
              onClick={() => {
                navigate("/dispatch-items/scan-pallet");
              }}
            />
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
