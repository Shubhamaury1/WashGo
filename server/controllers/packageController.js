import Package from "../models/Package.js";

export const createPackage = async (req, res) => {
  try {
    const pkg = await Package.create(req.body);

    res.status(201).json(pkg);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find().populate("vehicleId");

    res.json(packages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(pkg);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const togglePackageStatus = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    pkg.isActive = !pkg.isActive;

    await pkg.save();

    res.json(pkg);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
