  import Vehicle from "../models/Vehicle.js";

  export const createVehicle = async (req, res) => {
    try {
      const vehicle = await Vehicle.create(req.body);

      res.status(201).json(vehicle);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  export const getVehicles = async (req, res) => {
    try {
      const vehicles = await Vehicle.find();

      res.json(vehicles);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
