import { CreateDevolutionRentalUseCase } from "./CreateDevolutionRentalUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";


class CreateDevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { car_id } = request.params;
        const devolutionUseCase = container.resolve(CreateDevolutionRentalUseCase);

        const rental = await devolutionUseCase.execute({
            user_id,
            car_id,
        });

        return response.status(200).json(rental);
    };
};

export { CreateDevolutionRentalController };