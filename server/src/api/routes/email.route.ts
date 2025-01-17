import { Router } from "express";
import { EmailController } from "../controllers/email.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { body } from "express-validator";

const router = Router();

router.get("/", authMiddleware(), EmailController.getEmails);
router.get("/domains", EmailController.getDomains);
router.get("/:email/messages", EmailController.getMessages);
router.get("/message/:messageId", EmailController.getMessage);
router.post(
  "/",
  body("name")
    .if(body("name").exists().notEmpty())
    .isLength({ min: 5, max: 30 })
    .withMessage("Minimum length - 5, maximum - 30 for the name field"),
  authMiddleware(),
  EmailController.createEmail,
);
router.delete("/:email", authMiddleware(), EmailController.deleteEmail);

export default router;
