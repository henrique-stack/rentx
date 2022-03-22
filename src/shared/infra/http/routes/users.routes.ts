import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "@modules/account/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/account/useCases/updateUser/UpdateUserAvatarController";
import { ensureAuthenticated } from "../midlewares/ensureAuthenticated";
import uploadConfig from "@config/upload";
import { ensureAdmin } from "../midlewares/ensureAdmin";

const userRouter = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRouter.post("/",
createUserController.handle);

userRouter.patch("/avatar",
ensureAuthenticated,
ensureAdmin,
uploadAvatar.single("avatar"),
updateUserAvatarController.handle);

export { userRouter };