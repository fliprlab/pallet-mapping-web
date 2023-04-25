import React from "react";
import { UnstyledButton, Group, Text, Box } from "@mantine/core";
import { naves } from "./navs";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { COLORS } from "../colors";
import { ICONS } from "../icons";
import { getActiveState } from "./helper";

interface MainLinkProps {
  icon: string;
  activeIcon: string;
  label: string;
  to: string;
  hidden: boolean;
  disabled?: boolean;
  matchPath?: string;
}

const MainLink = ({
  icon,
  label,
  to,
  hidden,
  activeIcon,
  disabled = false,
  matchPath,
}: MainLinkProps) => {
  const navigate = useNavigate();
  const match = useMatch(to);
  const location = useLocation().pathname;

  return (
    <UnstyledButton
      disabled={disabled}
      onClick={() => navigate(to)}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        paddingTop: 8,
        marginBottom: 30,
        borderRadius: theme.radius.sm,
        fontWeight: "bold",
        position: "relative",
        minWidth: "max-content",
      })}
    >
      <Group>
        <img
          src={
            getActiveState({
              location: location.split("/")[1],
              matchPath: matchPath,
              match: Boolean(match),
            })
              ? activeIcon
              : icon
          }
          style={{ width: 20 }}
          alt="section icon"
        />

        <Text
          size={16}
          weight="500"
          color={
            getActiveState({
              location: location.split("/")[1],
              matchPath: matchPath,
              match: Boolean(match),
            })
              ? COLORS.secondary
              : COLORS.white
          }
          sx={{ opacity: hidden ? 0 : 1, transition: "all 300ms" }}
        >
          {label}
        </Text>
      </Group>

      {getActiveState({
        location: location.split("/")[1],
        matchPath: matchPath,
        match: Boolean(match),
      }) && (
        <Box
          sx={{
            position: "absolute",
            top: "calc(50% - 6.5px)",
            left: "-1.5em",
          }}
        >
          <img src={ICONS.polygon} alt="arrow" width={8} />
        </Box>
      )}
    </UnstyledButton>
  );
};

export const MainLinks = (props: { hidden: boolean }) => {
  const links = naves.map((link) => (
    <MainLink {...link} key={link.label} hidden={props.hidden} />
  ));
  return <div>{links}</div>;
};
