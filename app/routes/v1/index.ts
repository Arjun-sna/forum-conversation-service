import { Router } from "express";
import { getHealth } from "../../controllers/health";
import { catchAsyncController } from "../../utils/helpers";

const router = Router();

router.get("/health", catchAsyncController(getHealth));

export default router;
