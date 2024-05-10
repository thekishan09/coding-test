const { isEmpty } = require("../helpers/validateBody");
const { JSONResponse } = require("../model/response");
const { Vehicle } = require("../mongoose/vehicle.schema");

function addVehicle(req, res) {
  const { vin, vehicle_id, make, model, year } = req.body;
  if (
    isEmpty(vin) ||
    isEmpty(vehicle_id) ||
    isEmpty(make) ||
    isEmpty(model) ||
    isEmpty(year)
  ) {
    res.status(404).json(JSONResponse(false, "All fields are required", null));
    return;
  }
  const newVehicle = new Vehicle(req.body);
  newVehicle
    .save()
    .then(() => {
      res
        .status(200)
        .json(JSONResponse(true, "Data Added Successfully", req.body));
    })
    .catch((err) => {
      res.status(404).json(JSONResponse(false, err.message, null));
    });
}

module.exports = {
  addVehicle,
};
