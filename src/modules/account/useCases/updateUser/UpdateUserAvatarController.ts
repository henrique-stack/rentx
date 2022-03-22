import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

    const updateAvatarUserUseCase = container.resolve(UpdateUserAvatarUseCase);
    const avatar_file = request.file.filename;

    await updateAvatarUserUseCase.execute({
       user_id: id, 
       avatar_file: avatar_file,
    });

    return response.status(204).send();
  };
};

export { UpdateUserAvatarController };