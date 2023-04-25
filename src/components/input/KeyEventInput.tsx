import React, { memo, useState, useRef } from "react";
import { TextInput, createStyles } from "@mantine/core";
import { COLORS } from "../../colors";

interface IProps {
  onEventTrigger?: (value: string) => void;
  disabled?: boolean;
  alwaysFocus?: boolean;
  placeholder: string;
}

const KeyEventInput: React.FC<IProps> = ({
  onEventTrigger,
  disabled = false,
  alwaysFocus = false,
  placeholder,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { classes } = styles();
  const [value, setValue] = useState("");

  return (
    <TextInput
      ref={inputRef}
      autoFocus
      disabled={disabled}
      classNames={{ input: classes.input }}
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {
        alwaysFocus && setTimeout(() => inputRef.current?.focus(), 10);
        // inputRef.current?.focus();
      }}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          onEventTrigger && onEventTrigger(value);
          setValue("");
        }
      }}
    />
  );
};

export default memo(KeyEventInput);

const styles = createStyles({
  input: {
    "&:focus": {
      borderColor: COLORS.primary,
    },
  },
});
