import { Component } from "react";
import LeafletResultMap from "../components/LeafletResultMap";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DirectionsIcon from "@mui/icons-material/Directions";

import "./Listings.scss";

const emptyListingText =
  "Unfortunately there are no dining options in the vicinity...";

var filledListingText;

const ListingItem = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Grid sx={{ width: 228, height: 228 }}>
          <LeafletResultMap
            class={props.class}
            latitude={props.latitude}
            longitude={props.longitude}
            resultLatitude={props.resultLatitude}
            resultLongitude={props.resultLongitude}
            zoom={props.zoom}
          />
        </Grid>
      </Grid>
      <Stack className="l-info-container">
        <Typography variant="h6" color="#0A9830" component="div">
          {props.venueName}{" "}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          color="text.primary"
          sx={{ marginBottom: 2 }}
        >
          {props.category}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {props.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.distance} m
        </Typography>
        <Button
          className="l-directions-button"
          variant="contained"
          color="success"
          onClick={props.handleGmapsNavigation}
          sx={{
            marginTop: 7.8,
          }}
        >
          <DirectionsIcon color="inherit" sx={{ marginRight: 2 }} />
          Directions
        </Button>
      </Stack>
    </Grid>
  );
};

class Listings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: JSON.parse(localStorage.getItem("latitude")) || -999,
      longitude: JSON.parse(localStorage.getItem("longitude")) || -999,
      venues: JSON.parse(localStorage.getItem("fsqApiResponse")) || [],
      currentSelection: JSON.parse(localStorage.getItem("fsqApiResponse"))[0],
    };

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.handleGmapsNavigation = this.handleGmapsNavigation.bind(this);
  }

  componentDidMount() {
    this.setState({
      latitude: JSON.parse(localStorage.getItem("latitude")),
      longitude: JSON.parse(localStorage.getItem("longitude")),
      venues: JSON.parse(localStorage.getItem("fsqApiResponse")),
    });

    filledListingText =
      "Discovered " +
      this.state.venues.length +
      " dining options in the vicinity.";
  }

  handlePaginationChange(event, value) {
    this.setState({
      currentSelection: JSON.parse(localStorage.getItem("fsqApiResponse"))[
        value - 1
      ],
    });
  }

  handleGmapsNavigation() {
    window.open(
      `https://www.google.com/maps/dir/${this.state.latitude},${this.state.longitude}/${this.state.currentSelection.location.address}`
    );
  }

  render() {
    return (
      <Stack>
        <Typography
          variant="h4"
          color="text.primary"
          marginTop={2}
          marginLeft={2}
          marginRight={2}
          fontWeight="bold"
        >
          {this.state.count === 0 ? emptyListingText : filledListingText}
        </Typography>

        <Grid container justifyContent="center" marginTop={3}>
          <Card className="l-listing-card">
            <CardContent>
              <ListingItem
                class="result-map"
                latitude={this.state.latitude}
                longitude={this.state.longitude}
                resultLatitude={
                  this.state.currentSelection.geocodes.main.latitude
                }
                resultLongitude={
                  this.state.currentSelection.geocodes.main.longitude
                }
                zoom={12}
                venueName={this.state.currentSelection.name}
                distance={this.state.currentSelection.distance}
                address={this.state.currentSelection.location.formatted_address}
                category={this.state.currentSelection.categories[0].name}
                handleGmapsNavigation={this.handleGmapsNavigation}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid container sx={{ justifyContent: "center" }}>
          <Pagination
            className="l-pagination"
            count={this.state.venues.length}
            shape="rounded"
            onChange={this.handlePaginationChange}
          />
        </Grid>
      </Stack>
    );
  }
}

export default Listings;
