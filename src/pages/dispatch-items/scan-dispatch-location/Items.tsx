import React, { useMemo } from "react";
import { Box, Text } from "@mantine/core";
import FilledBtn from "../../../components/button/FilledBtn";

interface Props {
  items: any[];
}

function Items(props: Props) {
  const { items } = props;

  const itemsArray = useMemo(() => {
    let shipment: any[] = [];
    let cancelled: any[] = [];

    items.forEach((item) => {
      if (item.cancelled) {
        cancelled.push(item);
      } else {
        shipment.push(item);
      }
    });

    return {
      shipment,
      cancelled,
    };
  }, [items]);

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
        <Text
          size={15}
          weight={700}
        >{`Item Count: ${itemsArray.shipment.length}`}</Text>
        {itemsArray.shipment.map((itm) => {
          return <Text size={12}>{itm.itemId}</Text>;
        })}
      </Box>

      {itemsArray.cancelled.length > 0 && (
        <Box
          mt={10}
          style={{
            width: "100%",
          }}
        >
          <Text
            size={12}
          >{`Cancelled Item Count: ${itemsArray.cancelled.length}`}</Text>
          <FilledBtn title="View Cancelled Item QR Code" onClick={() => {}} />
        </Box>
      )}
    </>
  );
}

export default Items;
