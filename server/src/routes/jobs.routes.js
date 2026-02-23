import { createJob } from "../controllers/job.controller.js";
import {Router} from "express";

const router = Router();

router.route("/jobs").post(createJob);

export default router;