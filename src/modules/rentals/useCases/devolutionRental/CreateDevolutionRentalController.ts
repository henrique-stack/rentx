import { CreateDevolutionRentalUseCase } from "./CreateDevolutionRentalUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";


class CreateDevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id } = request.params;
        const devolutionUseCase = container.resolve(CreateDevolutionRentalUseCase);

        const rental = await devolutionUseCase.execute({
            id,
            user_id
        });

        return response.status(200).json(rental);
    };
};

export { CreateDevolutionRentalController };