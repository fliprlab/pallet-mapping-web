import React, { memo } from "react";
import { Button } from "@mantine/core";
import { COLORS } from "../../colors";

interface IProps {
  disabled?: boolean;
  onClick: () => void;
  title: string;
  loading?: boolean;
}

const FilledBtn: React.FC<IProps> = ({ onClick, title, disabled, loading }) => {
  return (
    <Button
      fullWidth
      loading={loading}
      mt={"xs"}
      disabled={disabled}
      sx={{
        backgroundColor: COLORS.primary,
        "&:hover": { backgroundColor: COLORS.primary },
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default memo(FilledBtn);
