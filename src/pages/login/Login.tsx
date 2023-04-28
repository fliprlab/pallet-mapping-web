import { Box, LoadingOverlay, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { useCheckAuthenticated } from "../../hooks/auth/useCheckAuthenthicated";
import { checkUserAuthenticate } from "../../services/authenticate.service";
import LoginForm from "./components/LoginForm";

import { styles } from "./Login.styles";
import { IMAGES } from "../../images";

const Login = () => {
  const { classes } = styles();

  const navigate = useNavigate();
  const { isLoading, refetch } = useCheckAuthenticated((res) =>
    checkUserAuthenticate(res, navigate)
  );

  if (isLoading) {
    return <LoadingOverlay visible={true} overlayBlur={2} />;
  }

  return (
    <Box
      display={"flex"}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        maxHeight: "-webkit-fill-available",
      }}
    >
      <Box>
        <Box className={classes.heroBanner}>
          <img src={IMAGES.intuFlipLogo} width={150} alt="logos" />
        </Box>
        <Box className={classes.textContainer}>
          <Text className={classes.loginTo}>LOGIN TO</Text>
          <Text className={classes.palletMapping}>PALLET MAPPING APP</Text>
        </Box>
        <LoginForm refetch={refetch} />
      </Box>
    </Box>
  );

  // return (
  //   <Grid sx={{ minHeight: "100vh" }} gutter={0}>
  //     <Grid.Col sm={5} className={classes.leftContainer}>
  //       <Box sx={{ width: "100%" }}>
  //         <Box mb={60}>
  //           <Text weight={700} size={26} color={COLORS.secondary}>
  //             Login To Pallet Mapping
  //           </Text>
  //           <Text weight={500} size={18} color={COLORS.grey}>
  //             Welcome Back,
  //           </Text>
  //         </Box>
  //         <LoginForm refetch={refetch} />
  //       </Box>
  //     </Grid.Col>
  //     <Grid.Col sm={7} className={classes.rightContainer}>
  //       <RightBlock />
  //     </Grid.Col>
  //   </Grid>
  // );
};

export default Login;
