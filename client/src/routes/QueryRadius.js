import { Component } from "react";
import LeafletSearchRadiusMap from "../components/LeafletSearchRadiusMap";
import { callPlacesAPI } from "../services/PlacesAPI";
import { withRouter } from "../utilities/withRouter";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

import { motion } from "framer-motion";

import "./QueryRadius.scss";
import { Typography } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#11cb5f",
    },
  },
});

// Foursquare category ID
const foodAndDiningCategoryId = 13000;

class QueryRadius extends Component {
  constructor(props) {
    super(props);

    // Persist location data
    this.state = {
      latitude: JSON.parse(localStorage.getItem("latitude")) || -999,
      longitude: JSON.parse(localStorage.getItem("longitude")) || -999,
      searchRadius: 100,
    };

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.callFsqPlacesApi = this.callFsqPlacesApi.bind(this);
  }

  componentDidMount() {
    this.setState({
      latitude: JSON.parse(localStorage.getItem("latitude")),
      longitude: JSON.parse(localStorage.getItem("longitude")),
      searchRadius: 100,
    });
  }

  setPersistentState(stateId, state) {
    window.localStorage.setItem(stateId, JSON.stringify(state));
  }

  handleSliderChange(event, value) {
    this.setState({ searchRadius: value });
  }

  async callFsqPlacesApi(category, latitude, longitude, radius) {
    await callPlacesAPI(latitude, longitude, radius, category)
      .then((response) => response.json())
      .then((response) =>
        this.setPersistentState("fsqApiResponse", response.results)
      );

    this.props.navigate("/listings");
  }

  render() {
    return (
      <motion.div
        className="qr-framer-container"
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
      >
        <Grid container>
          <Grid item md>
            <Typography
              variant="h4"
              color="#0A9830"
              marginTop={2}
              marginLeft={2}
              marginRight={2}
              fontWeight="bold"
            >
              Feeling hungry?
            </Typography>
            <Typography
              variant="h5"
              color="text.primary"
              marginTop={2}
              marginLeft={2}
              marginRight={2}
              fontWeight="bold"
            >
              Discover up to 50 dining locations in your vicinity!
            </Typography>

            <Stack marginTop={5}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "center" }}
                fontWeight="bold"
              >
                Search Radius
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "center" }}
                fontWeight="bold"
              >
                {this.state.searchRadius > 1000
                  ? this.state.searchRadius / 1000
                  : this.state.searchRadius}{" "}
                {this.state.searchRadius > 1000 ? "km" : "m"}
              </Typography>
              <Box sx={{ marginLeft: 10, marginRight: 10 }}>
                <ThemeProvider theme={theme}>
                  <Slider
                    defaultValue={0}
                    aria-label="Default"
                    onChange={this.handleSliderChange}
                    min={100}
                    max={5000}
                    step={100}
                    valueLabelDisplay="off"
                    color="secondary"
                    sx={{ marginTop: 2 }}
                  />
                </ThemeProvider>
              </Box>
              <Box alignSelf="center" marginTop={2} marginBottom={4}>
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => {
                    this.callFsqPlacesApi(
                      foodAndDiningCategoryId,
                      this.state.latitude,
                      this.state.longitude,
                      this.state.searchRadius
                    );
                  }}
                >
                  <SearchIcon color="inherit" sx={{ marginRight: 2 }} />
                  Discover now
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid item>
            <LeafletSearchRadiusMap
              class="radius-map"
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              searchRadius={this.state.searchRadius}
              zoom={12}
            />
          </Grid>
        </Grid>
      </motion.div>
    );
  }
}

export default withRouter(QueryRadius);
