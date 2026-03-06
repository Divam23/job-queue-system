import { getQueueStats } from "../controllers/admin.controller.js";
import {Router} from "express";

const router = Router();

router.route("/stats").get(getQueueStats);

export default router