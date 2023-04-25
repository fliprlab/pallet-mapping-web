import { Button } from "@mantine/core";
import React, { memo } from "react";

interface IProps {
  onClick: () => void;
  title: string;
  bgc: string;
}

const CardBtn: React.FC<IProps> = ({ bgc, onClick, title }) => {
  return (
    <Button
      fullWidth
      onClick={onClick}
      sx={{
        textTransform: "uppercase",
        backgroundColor: bgc,
        borderRadius: 2,
        "&:hover": { backgroundColor: bgc },
      }}
    >
      {title}
    </Button>
  );
};

export default memo(CardBtn);
