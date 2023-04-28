import React, { memo } from "react";
import { Button, Sx } from "@mantine/core";
import { COLORS } from "../../colors";

interface IProps {
  disabled?: boolean;
  onClick: () => void;
  title: string;
  loading?: boolean;
  sx?: Sx;
}

const FilledBtn: React.FC<IProps> = ({
  onClick,
  title,
  disabled,
  loading,
  sx,
}) => {
  return (
    <Button
      fullWidth
      loading={loading}
      mt={"xs"}
      disabled={disabled}
      sx={{
        backgroundColor: COLORS.primary,
        "&:hover": { backgroundColor: COLORS.primary },
        ...sx,
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default memo(FilledBtn);
