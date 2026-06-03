import Address from "../models/Address.js";

// Create
// export const createAddress = async (req, res) => {
//   try {
//     const address = await Address.create(req.body);

//     res.status(201).json(address);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
export const createAddress = async (req, res) => {
  try {
    const { userId } = req.body;

    await Address.updateMany({ userId }, { isDefault: false });

    const address = await Address.create({
      ...req.body,
      isDefault: true,
    });

    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get All
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();

    res.json(addresses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update
export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    res.json(address);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete
export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(
      req.params.id
    );

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    res.json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};