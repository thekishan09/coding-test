const { JSONResponse } = require("../model/response");
const { Vehicle } = require("../mongoose/vehicle.schema");

function getVehicles(req, res) {
  Vehicle.find()
    .then((vehicles) => {
      res
        .status(200)
        .json(JSONResponse(true, "Data Fetched Successfully", vehicles));
    })
    .catch((err) => {
      res.status(404).json(JSONResponse(false, err.message, null));
    });
}

module.exports = {
  getVehicles,
};
