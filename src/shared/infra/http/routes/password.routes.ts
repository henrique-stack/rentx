import { SendForgtPasswordMailController } from "@modules/account/useCases/sendForgotPawordMail/SendForgotPassordMailController";
import { Router } from "express";

const passwordRouter = Router();

const sendForgotPasswordMailController = new SendForgtPasswordMailController();

passwordRouter.post("/forgot", sendForgotPasswordMailController.handle);

export { passwordRouter };