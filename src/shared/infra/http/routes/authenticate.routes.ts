import { AuthenticateController } from "@modules/account/useCases/createUser/authenticateUser/AuthenticateController";
import { RefreshTokenController } from "@modules/account/useCases/refreshToken/RefreshTokenController";
import { Router } from "express";
const authenticateRouter = Router();

const authenticateController = new AuthenticateController();
const refreshTokensController = new RefreshTokenController();
authenticateRouter.post("/sessions", authenticateController.handle);
authenticateRouter.post("/refresh-token", refreshTokensController.handle);

export { authenticateRouter };