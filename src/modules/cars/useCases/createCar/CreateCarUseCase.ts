import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { inject, injectable } from "tsyringe";
import { AppErrors } from "@error/AppErrors";

interface IRequest {
  name: string;
  description: string;
  license_plate: string;
  dayle_rate: number;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carRepository: ICarsRepository
  ) { }
  async execute({
    name,
    description,
    category_id,
    license_plate,
    dayle_rate,
    fine_amount,
    brand,
  }: IRequest): Promise<Cars> {

    const carVerify = await this.carRepository.findByLicensePlate(license_plate);

    if (carVerify) {
      throw new AppErrors("Car already exists!");
    };
    
    const car = await this.carRepository.create({
      name,
      description,
      license_plate,
      dayle_rate,
      fine_amount,
      brand,
      category_id
    });
    return car;
  };
};

export { CreateCarUseCase };