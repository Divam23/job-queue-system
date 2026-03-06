import { createJob, getJob } from "../controllers/job.controller.js";
import {Router} from "express";

const router = Router();

router.route("/").post(createJob);

router.route("/:id").get(getJob);

export default router;