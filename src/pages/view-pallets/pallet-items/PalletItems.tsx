import React, { useEffect, useMemo } from "react";
import { ActionIcon, Box, Grid, Loader, createStyles } from "@mantine/core";
import { useHeaderStore } from "../../../store/headerStore";
import { IMAGES } from "../../../images";
import { useNavigate, useParams } from "react-router-dom";

import { useGetPalletItemsQuery } from "../../../hooks/view-pallet/queries/useGetPalletItems.query";
import { ICONS } from "../../../icons";
import { useRemovePalletItemMutation } from "../../../hooks/view-pallet/mutation/useRemovePalletItem.mutation";
import { showNotification } from "@mantine/notifications";

const PalletItems = () => {
  const navigate = useNavigate();
  const setHeader = useHeaderStore((h) => h.setHeader);

  const pallet: any = useParams<{ pallet: string }>().pallet;

  const { isLoading, data } = useGetPalletItemsQuery({
    pallet: pallet,
  });

  const { isLoading: deleteLoading, mutateAsync } =
    useRemovePalletItemMutation(pallet);

  const { classes } = useStyles();

  const items: { _id: string; itemId: string }[] = useMemo(() => {
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
      lebel: "Items",
    });
  }, [navigate, setHeader]);

  const handleRemoveItem = async (_id: string) => {
    const res = await mutateAsync({ _id });
    if (res.status === "success") {
      showNotification({
        color: "green",
        title: res.title,
        message: res.message,
      });
    } else {
      showNotification({
        color: "red",
        title: res.data.title,
        message: res.data.message,
      });
    }
  };

  return (
    <Box p={"2em"}>
      <Box p={15}>
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
        <Grid gutter={20}>
          {items && items.length > 0 ? (
            items.map((item) => (
              <Grid.Col key={item._id} lg={12}>
                <Box className={classes.palletBox}>
                  <p>Item - {item.itemId}</p>
                  <ActionIcon
                    onClick={() => handleRemoveItem(item._id)}
                    disabled={deleteLoading}
                    loading={deleteLoading}
                  >
                    <img
                      style={{ width: "10px", height: "12px" }}
                      src={ICONS.trashIcon}
                      alt="del btn"
                    />
                  </ActionIcon>
                </Box>
              </Grid.Col>
            ))
          ) : (
            <Grid.Col lg={12}>
              <Box style={{ textAlign: "center" }}>No Items Available</Box>
            </Grid.Col>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default PalletItems;

const useStyles = createStyles({
  palletBox: {
    background: "#F9F9F9",
    fontSize: 12.5,
    color: "#373737",
    fontWeight: 500,
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 5,

    wordBreak: "break-word",
    alignItems: "center",
    padding: 10,
  },
});
