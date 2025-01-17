import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/auth", UserController.authUser);
router.get("/", authMiddleware(true), UserController.getAllUsers);

export default router;
