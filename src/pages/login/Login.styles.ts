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
  heroBanner: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 100,
  },
  textContainer: {
    marginTop: 25,
  },
  loginTo: {
    color: COLORS.black,
    fontSize: 22,
    fontWeight: 700,
  },
  palletMapping: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 700,
    marginTop: 10,
  },
}));
