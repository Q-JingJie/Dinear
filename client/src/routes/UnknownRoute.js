import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

function UnknownRoute(props) {
  return (
    <Stack>
      <Typography
        variant="h2"
        color="#0A9830"
        alignSelf="center"
        fontWeight="bold"
        marginTop="30vh"
      >
        Opps!
      </Typography>
      <Typography
        variant="h4"
        color="text.primary"
        alignSelf="center"
        fontWeight="bold"
        marginLeft="20px"
        marginRight="20px"
      >
        There is nothing to see here.
      </Typography>
    </Stack>
  );
}

export default UnknownRoute;
