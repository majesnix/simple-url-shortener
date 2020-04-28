import { Router } from "express";
const router: Router = Router();

import rateLimit from "express-rate-limit";
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 15,
});

import {
	createUrl,
	getUrl,
	getAllUrl,
	deleteUrl,
} from "../controllers/urlsController";
import checkAuth from "../middleware/check-auth";

router.post("/", apiLimiter, createUrl);
router.delete("/:id", checkAuth, deleteUrl);
router.get("/getAll", checkAuth, getAllUrl);
router.get("/:shortUrl", getUrl);
router.get("/", apiLimiter, createUrl);

export default router;
