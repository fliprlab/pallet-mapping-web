import React from "react";
import { Box, Text } from "@mantine/core";

interface Props {
  items: any[];
  title: string;
}

function Items(props: Props) {
  const { items } = props;

  return (
    <>
      <Box
        px={10}
        py={10}
        style={{
          backgroundColor: "#E9ECEF",
          width: "100%",
        }}
      >
        <Text size={15} weight={700}>{`Item Count: ${items.length}`}</Text>
        {items.map((itm) => {
          return <Text size={12}>{itm.itemId}</Text>;
        })}
      </Box>
    </>
  );
}

export default Items;
