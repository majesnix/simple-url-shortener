import { Router } from "express";
const router: Router = Router();

import rateLimit from "express-rate-limit";
const loginLimiter = new rateLimit({
	max: 5,
	message: "Too many requests, please try again after an hour",
	windowMs: 15 * 60 * 1000,
});

import {
	createUser,
	deleteUser,
	getUser,
	getAllUser,
	loginUser,
	updateUser,
	userIsAuthenticated
} from "../controllers/userController";
import checkAuth from "../middleware/check-auth";

router.get("/:id", checkAuth, getUser);
router.get("/", checkAuth, getAllUser);
router.get("/isAdmin", userIsAuthenticated);
router.post("/create", checkAuth, createUser);
router.put("/:id", checkAuth, updateUser);
router.delete("/:id", checkAuth, deleteUser);

router.post("/login", loginLimiter, loginUser);

export default router;
