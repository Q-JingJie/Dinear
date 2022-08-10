import { Component } from "react";
import { withRouter } from "../utilities/withRouter";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import MyLocationIcon from "@mui/icons-material/MyLocation";

import "./HomePage.scss";
import logo from "../dinear.svg";

const FooterLink = () => {
  return (
    <footer className="hp-footer">
      <Stack direction="column" alignItems="center">
        <IconButton
          sx={{ color: "whitesmoke", width: 25, height: 25, marginBottom: 1 }}
          href="https://github.com/Q-JingJie/Starved."
        >
          <GitHubIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary" marginBottom="1">
          A mini project by: Q-JingJie (2022)
        </Typography>
      </Stack>
    </footer>
  );
};

const RetrieveLocationButton = (props) => {
  return (
    <Button
      variant="contained"
      color="success"
      onClick={props.retrieveLocation}
    >
      <MyLocationIcon color="inherit" sx={{ marginRight: 2 }} />
      Retrieve Location
    </Button>
  );
};

class HomePage extends Component {
  constructor() {
    super();

    this.retrieveLocation = this.retrieveLocation.bind(this);
  }

  setPersistentState(stateId, state) {
    window.localStorage.setItem(stateId, JSON.stringify(state));
  }

  // Retrieve location data from web browser (Permission required)
  retrieveLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition);
    } else {
      this.props.navigate("/locationError");
    }
  }

  setPosition = (position) => {
    this.setPersistentState("latitude", position.coords.latitude);
    this.setPersistentState("longitude", position.coords.longitude);

    this.props.navigate("/queryRadius");
  };

  render() {
    return (
      <div className="hp-base">
        <Grid container>
          <Grid item xs={12}>
            <Stack>
              <Box
                component="img"
                sx={{
                  alignSelf: "center",
                  maxWidth: { xs: 280, md: 720 },
                  marginTop: { xs: 20, md: 5 },
                }}
                src={logo}
              />
              <Typography
                variant="h5"
                color="text.primary"
                alignSelf="center"
                sx={{ paddingBottom: 5 }}
              >
                Locate &#183; Discover &#183; Dine
              </Typography>
              <Box alignSelf="center">
                <RetrieveLocationButton
                  retrieveLocation={this.retrieveLocation}
                />
              </Box>
              <Box alignSelf="center">
                <FooterLink />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(HomePage);
