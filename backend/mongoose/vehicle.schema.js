const mongoose = require("mongoose");
const VehicleSchema = new mongoose.Schema({
  vin: {
    type: String,
  },
  vehicle_id: {
    type: String,
  },
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  year: {
    type: String,
  },
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

module.exports = { Vehicle };
