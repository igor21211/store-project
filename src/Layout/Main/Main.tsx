import Header from "../../Pages/Header/Header";
import Sidebar from "../../Pages/SideBar/Sidebar";
import Footer from "../../Pages/Footer/Footer";
import { GridContainer } from "./styled";
import { Outlet } from "react-router-dom";
import { Grid, useMediaQuery } from "@mui/material";

const Main = (): JSX.Element => {
  const isMobile = useMediaQuery("(max-width: 1200px)");
  const isTablet = useMediaQuery("(max-width: 1500px)") && !isMobile;

  return (
    <>
      <GridContainer container spacing={3} data-testid="main">
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={1}></Grid>
        {!isMobile && !isTablet && (
          <Grid item xs={2}>
            <Sidebar data-testid="sidebar" />
          </Grid>
        )}
        {isMobile && (
          <Grid item xs={12}>
            <Outlet data-testid="outlet" />
          </Grid>
        )}
        {isTablet && (
          <Grid item xs={11}>
            <Outlet data-testid="outlet" />
          </Grid>
        )}
        {!isMobile && !isTablet && (
          <Grid item xs={7}>
            <Outlet data-testid="outlet" />
          </Grid>
        )}
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Main;
