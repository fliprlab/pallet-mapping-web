import { Box, createStyles, Flex, Text } from "@mantine/core";
import React, { memo } from "react";
import { COLORS } from "../colors";
import { logoutUser } from "../services/authenticate.service";
import { IMAGES } from "../images";
import { useLocation, useNavigate } from "react-router-dom";

const TheHeader = () => {
  const { classes } = useStyle();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className={classes.header}>
      <Flex>
        <img src={IMAGES.logOutIcon} className={classes.icon} alt="logout" />
        <Text className={classes.label}>Pallet Mapping</Text>
      </Flex>
      <Flex onClick={() => logoutUser()} align={"center"}>
        <img src={IMAGES.intuFlipLogo} width={30} alt="logo" />
      </Flex>
    </Box>
  );
};

export default memo(TheHeader);

const useStyle = createStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "2em 2em",
  },
  icon: {
    width: 18,
    marginRight: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: 400,
    color: COLORS.lightGray,
    marginLeft: 10,
  },
});
