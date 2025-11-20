import express from "express";
import { upload } from "../middlewares/upload.js";
import {
  createService,
  getAllServices,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import { validateService } from "../middlewares/validateService.js";
import { parseFormData } from "../middlewares/formDataParser.js";
const router = express.Router();
router.post("/", upload.array("imgs"), createService);
router.get("/", getAllServices);
router.put("/:id", parseFormData, validateService, updateService);
router.delete("/:id", deleteService);
export default router;
