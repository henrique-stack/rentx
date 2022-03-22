import { AuthenticateUserController } from "@modules/account/useCases/createUser/authenticateUser/AuthenticateUserController";
import { CreateRefreshTokenController } from "@modules/account/useCases/refreshToken/CreateRefreshTokenController";
import { Router } from "express";
const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokensController = new CreateRefreshTokenController();
authenticateRouter.post("/sessions", authenticateUserController.handle);
authenticateRouter.post("/refresh-token", refreshTokensController.handle);

export { authenticateRouter };