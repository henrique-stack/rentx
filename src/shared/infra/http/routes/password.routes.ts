import { SendForgotPasswordMailController } from "@modules/account/useCases/sendForgotPawordMail/SendForgotPassordMailController";
import { Router } from "express";

const passwordRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRouter.post("/forgot", sendForgotPasswordMailController.handle);

export { passwordRouter };
