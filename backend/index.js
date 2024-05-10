const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { vehicleRoute } = require("./controller/vehicle.routes");
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/", { dbName: "VehicleDetails" })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Error in DB", err.message));

app.use(vehicleRoute);

app.listen(3001, () => {
  console.log("Server is running");
});
