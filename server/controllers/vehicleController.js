import Vehicle from "../models/Vehicle.js";

export const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create({
      name: req.body.name,

      image: req.file ? `/uploads/${req.file.filename}` : "",

      description: req.body.description,
    });

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

export const updateVehicle = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const toggleVehicleStatus = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    vehicle.isActive = !vehicle.isActive;

    await vehicle.save();

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};