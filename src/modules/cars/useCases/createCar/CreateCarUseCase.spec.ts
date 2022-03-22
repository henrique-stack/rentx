import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { AppErrors } from "@error/AppErrors";

let carRepositoryInMemory: CarRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
describe("Create Car", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);
  });

  it("should not be able to create a car with exists license plate", async () => {
      await createCarUseCase.execute({
          name: "Car 2",
          description: "carro para passeio",
          license_plate: "Already exists!",
          dayle_rate: 32,
          fine_amount: 45,
          brand: "wolkswagen",
          category_id: "category",
      });

      await expect(
        createCarUseCase.execute({
        name: "Car 2",
        description: "carro para passeio",
        license_plate: "Already exists!",
        dayle_rate: 32,
        fine_amount: 45,
        brand: "wolkswagen",
        category_id: "category",
      })
      ).rejects.toEqual(new AppErrors("Car already exists!"));
  });

  it("should be able to create a car with a available how true", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 2",
      description: "carro para passeio",
      license_plate: "ABC-123",
      dayle_rate: 32,
      fine_amount: 45,
      brand: "wolkswagen",
      category_id: "category",
    });
    expect(car.available).toBe(true);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Mercedes",
      description: "carro para passeio",
      license_plate: "ABC-123",
      dayle_rate: 32,
      fine_amount: 45,
      brand: "wolkswagen",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });
});
