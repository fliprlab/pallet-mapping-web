import { Box, createStyles, Flex, Text } from "@mantine/core";
import React, { memo, useMemo } from "react";
import { COLORS } from "../colors";
import { logoutUser } from "../services/authenticate.service";
import { IMAGES } from "../images";
import { useActionData, useLocation, useNavigate } from "react-router-dom";
import { useHeaderStore } from "../store/headerStore";

const TheHeader = () => {
  const { classes } = useStyle();
  const navigate = useNavigate();
  const location = useLocation();

  const headerDate = useHeaderStore((h) => h.header);

  const imageIcon = useMemo(() => {
    if (location.pathname == "") {
      return IMAGES.logOutIcon;
    } else {
      return IMAGES.backArrowIcon;
    }
  }, [location]);

  return (
    <Box className={classes.header}>
      <Flex align={"center"} onClick={headerDate.iconClick}>
        <div>
          <img
            src={headerDate.icon}
            className={classes.icon}
            height={"auto"}
            alt="logout"
          />
        </div>
        <Text className={classes.label}>{headerDate.lebel}</Text>
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
    display: "block",
  },
  label: {
    fontSize: 12,
    fontWeight: 400,
    color: COLORS.lightGray,
    marginLeft: 10,
  },
});
