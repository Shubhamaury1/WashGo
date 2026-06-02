import express from "express";

import {
  createPackage,
  getPackages,
} from "../controllers/packageController.js";

const router = express.Router();

router.post("/", createPackage);

router.get("/", getPackages);

export default router;
