const request = require("request");

const geocode = (address, callback) => {
  const geocodeURL =
    "http://api.positionstack.com/v1/forward?access_key=d46db86c300165c90d45614bfff75a14&query=" +
    address +
    "&limit=1";

  request({ url: geocodeURL, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to the server", undefined);
    } else if (body.data.length === 0) {
      callback("unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        label: body.data[0].label,
      });
    }
  });
};

module.exports = geocode;
