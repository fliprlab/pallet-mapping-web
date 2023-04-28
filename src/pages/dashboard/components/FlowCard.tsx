import React, { memo } from "react";
import { createStyles, Flex, Text } from "@mantine/core";
import CardBtn from "./CardBtn";

interface IProps {
  onClick: () => void;
  btnTitle: string;
  cardTitleOne: string;
  cardTitleSecond: string;
  color: string;
  image: string;
}

const FlowCard: React.FC<IProps> = ({
  btnTitle,
  cardTitleOne,
  cardTitleSecond,
  onClick,
  color,
  image,
}) => {
  const { classes } = styles();
  return (
    <div className={classes.root}>
      <Flex align={"center"} justify={"space-between"}>
        <div className={classes.detailsBlock}>
          <Text className={classes.heading} sx={{ color }}>
            {cardTitleOne} <br /> {cardTitleSecond}
          </Text>
          <CardBtn onClick={onClick} title={btnTitle} bgc={color} />
        </div>
        <div className={classes.img}>
          <img src={image} alt="Flow Card" />
        </div>
      </Flex>
    </div>
  );
};

export default memo(FlowCard);

const styles = createStyles({
  root: {
    border: "1px solid #CCCCCC",
    boxShadow:
      "2px 0px 4px rgba(218, 218, 218, 0.7), 0px 2px 4px rgba(214, 214, 214, 0.6)",
    padding: "20px 20px",
    background: "#FAFAFA",
    borderRadius: 5,
    height: "100%",
  },
  detailsBlock: {
    minWidth: 118,
  },
  heading: {
    margin: 0,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: 500,
    marginBottom: 10,
  },

  img: {
    maxWidth: 180,
    "& img": { width: "100%" },
  },
});
