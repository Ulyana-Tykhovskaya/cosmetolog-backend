import express from "express";
import {
  createService,
  getAllServices,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import { validateService } from "../middlewares/validateService.js";
const router = express.Router();
router.post("/", validateService, createService);
router.get("/", getAllServices);
router.put("/:id", validateService, updateService);
router.delete("/:id", deleteService);
export default router;
