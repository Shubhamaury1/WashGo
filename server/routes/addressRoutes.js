import express from "express";

import {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  getAddressesByUserId,
} from "../controllers/addressController.js";

const router = express.Router();

router.get("/", getAddresses);

router.post("/", createAddress);

router.put("/:id", updateAddress);

router.delete("/:id", deleteAddress);

router.get("/user/:userId", getAddressesByUserId);

export default router;
