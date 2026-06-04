import express from "express";

import {
  createVehicle,
  getVehicles,
  updateVehicle,
  toggleVehicleStatus,
} from "../controllers/vehicleController.js";
import { upload } from "../middleware/uploadMiddleware.js";


const router = express.Router();

router.post("/", upload.single("image"), createVehicle);

router.get("/", getVehicles);

router.put("/:id", upload.single("image"), updateVehicle);

router.patch("/:id/status", toggleVehicleStatus);

export default router;
