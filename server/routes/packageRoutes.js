import express from "express";

import {
  createPackage,
  getPackages,
  updatePackage,
  togglePackageStatus,
} from "../controllers/packageController.js";

const router = express.Router();

router.post("/", createPackage);

router.get("/", getPackages);

router.put("/:id", updatePackage);

router.patch("/:id/status", togglePackageStatus);
export default router;
