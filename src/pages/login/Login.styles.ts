import { createStyles } from "@mantine/core";
import { COLORS } from "../../colors";

export const styles = createStyles((theme) => ({
  leftContainer: {
    backgroundColor: COLORS.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5em",
    "@media(max-width: 500px)": {
      padding: "2em",
    },
  },
  rightContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5em",
  },
}));
