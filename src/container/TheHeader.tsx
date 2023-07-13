import { Box, createStyles, Flex, Text } from "@mantine/core";
import React, { memo } from "react";
import { COLORS } from "../colors";

import { IMAGES } from "../images";

import { useHeaderStore } from "../store/headerStore";
import { useNavigate } from "react-router-dom";

const TheHeader = () => {
  const { classes } = useStyle();
  const navigate = useNavigate();

  const headerDate = useHeaderStore((h) => h.header);

  return (
    <Box className={classes.header}>
      <Flex align={"center"}>
        <div onClick={headerDate.iconClick}>
          <img
            src={headerDate.icon}
            className={classes.icon}
            height={"auto"}
            alt="logout"
          />
        </div>
        <Text className={classes.label}>{headerDate.lebel}</Text>
      </Flex>
      <Flex onClick={() => navigate("/dashboard")} align={"center"}>
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
