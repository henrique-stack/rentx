import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { inject, injectable } from "tsyringe";

interface ICarImage {
    car_id: string;
    images_name: string[];
};

@injectable()
class UploadCarImageUseCase {
    constructor(
        @inject("CarsImageRepository")
        private carsImageRepository: ICarImageRepository
    ) {}
   async execute({car_id, images_name}: ICarImage): Promise<void> {
        images_name.map(async image => {
            await this.carsImageRepository.create(car_id, image);
        }); 
    };
};
export { UploadCarImageUseCase };