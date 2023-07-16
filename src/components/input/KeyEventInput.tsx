import React, {
  memo,
  useState,
  useRef,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { TextInput, createStyles } from "@mantine/core";
import { COLORS } from "../../colors";

interface IProps {
  onEventTrigger?: (value: string) => void;
  disabled?: boolean;
  alwaysFocus?: boolean;
  placeholder: string;
}

export interface IKeyKeyEventInputRef {
  focus: () => void;
}

const KeyEventInput = (
  props: IProps,
  ref: ForwardedRef<IKeyKeyEventInputRef>
) => {
  const {
    onEventTrigger,
    disabled = false,
    alwaysFocus = false,
    placeholder,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const { classes } = styles();
  const [value, setValue] = useState("");

  const focus = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        focus,
      };
    },
    [focus]
  );

  return (
    <TextInput
      inputMode="none"
      ref={inputRef}
      autoFocus
      disabled={disabled}
      classNames={{ input: classes.input }}
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {
        alwaysFocus && setTimeout(() => inputRef.current?.focus(), 10);
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

export default memo(forwardRef(KeyEventInput));

const styles = createStyles({
  input: {
    "&:focus": {
      borderColor: COLORS.primary,
    },
  },
});
