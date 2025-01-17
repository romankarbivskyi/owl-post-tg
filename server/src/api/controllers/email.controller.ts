import { Request, Response, NextFunction } from "express";
import { EmailService } from "../services/email.service";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error";

export class EmailController {
  static async getDomains(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await EmailService.getDomains();

      res.status(200).json(response.domains);
    } catch (err) {
      next(err);
    }
  }

  static async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      const response = await EmailService.getMessages(email);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async getMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { messageId } = req.params;
      const response = await EmailService.getMessage(messageId);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async createEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        throw ApiError.BadRequest(result.array()[0].msg);
      }

      const { name, domain } = req.body;
      console.log(name, domain);
      const userId = (req as any).user.tgId;
      const response = await EmailService.createEmail(name, domain, userId);

      res.status(200).json(response.data);
    } catch (err) {
      next(err);
    }
  }

  static async deleteEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      const userId = (req as any).user.tgId;
      await EmailService.deleteEmail(email, userId);

      res.status(200).json({
        message: "Email deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async getEmails(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const response = await EmailService.getEmails(userId);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
