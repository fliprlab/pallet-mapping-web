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
  }, []);

  return (
    <Box p={"2em"}>
      <Box sx={{ marginBottom: "2em" }}>
        <Grid>
          <Grid.Col sm={4}>
            <FlowCard
              btnTitle="CREATE"
              cardTitleOne="Create"
              cardTitleSecond="Bag"
              color="#4292f3"
              onClick={() => {
                navigate("/create-bag/select-location");
              }}
              image={IMAGES.createBag}
            />
          </Grid.Col>
          <Grid.Col sm={4}>
            <FlowCard
              btnTitle="put away"
              cardTitleOne="Pallet put"
              cardTitleSecond="away."
              color="#cd4d00"
              onClick={() => {
                navigate("/put-away/select-location");
              }}
              image={IMAGES.putAway}
            />
          </Grid.Col>
          <Grid.Col sm={4}>
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
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
