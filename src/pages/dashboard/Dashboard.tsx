import { Box, Grid } from "@mantine/core";

import FlowCard from "./components/FlowCard";
import { IMAGES } from "../../images";

const Dashboard = () => {
  return (
    <Box p={"2em"}>
      <Box sx={{ marginBottom: "2em" }}>
        <Grid>
          <Grid.Col sm={4}>
            <FlowCard
              btnTitle="put away"
              cardTitleOne="Pallet put"
              cardTitleSecond="away."
              color="#cd4d00"
              onClick={() => {}}
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
              onClick={() => {}}
            />
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
