const { Router } = require("express");
const { addVehicle } = require("../services/addVehicle");
const { getVehicles } = require("../services/getVehicles");

const vehicleRoute = Router();

vehicleRoute.post("/api/addVehicle", addVehicle);
vehicleRoute.get("/api/allVehicle", getVehicles);

module.exports = { vehicleRoute };
