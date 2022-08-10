export async function callPlacesAPI(latitude, longitude, radius, category) {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.REACT_APP_API_KEY,
    },
  };

  return await fetch(
    `https://api.foursquare.com/v3/places/search?ll=${latitude},${longitude}&radius=${radius}&categories=${category}&sort=DISTANCE&limit=50`,
    options
  );
}
