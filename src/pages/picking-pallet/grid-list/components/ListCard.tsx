import { Button, createStyles } from "@mantine/core";
import React, { memo } from "react";
import { COLORS } from "../../../../colors";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface IProps {
  item: {
    _id: string;
    palletId: string;
    virtualId: string;
    gridId: string;
    createdAt: Date;
  };
}

const ListCard: React.FC<IProps> = ({ item }) => {
  const { classes } = styles();
  const navigate = useNavigate();
  const { _id, createdAt, gridId, palletId, virtualId } = item;
  return (
    <div className={classes.root}>
      <p className={classes.date}>
        {moment(createdAt).format("DD MMMM YYYY, hh:mm A")}
      </p>
      <p className={classes.title}>
        Pallet Id <span className={classes.value}>{palletId}</span>
      </p>
      <p className={classes.title}>
        Virtual Id <span className={classes.value}>{virtualId}</span>
      </p>
      <p className={classes.title}>
        Grid Id <span className={classes.value}>{gridId}</span>
      </p>
      <Button
        mt={"sm"}
        size="xs"
        sx={{
          backgroundColor: COLORS.primary,
          "&:hover": { backgroundColor: COLORS.primary },
        }}
        onClick={() => {
          navigate(`/picking/scan-grid/${_id}`);
        }}
      >
        Pick Up
      </Button>
    </div>
  );
};

export default memo(ListCard);

const styles = createStyles({
  root: {
    border: "1px solid #CCCCCC",
    boxShadow:
      "2px 0px 4px rgba(218, 218, 218, 0.7), 0px 2px 4px rgba(214, 214, 214, 0.6)",
    padding: "8px 16px",
    background: "#FAFAFA",
    borderRadius: 5,
    height: "100%",
  },
  date: {
    fontStyle: "italic",
    color: "#7a7a7a",
    fontSize: 14,
    marginBottom: 10,
  },
  title: {
    color: "#373737",
    fontSize: 14,
    fontWeight: 500,
  },
  value: { color: "#595959", fontWeight: 400 },
});
