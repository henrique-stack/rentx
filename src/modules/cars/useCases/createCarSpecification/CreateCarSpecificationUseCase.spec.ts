import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { AppErrors } from "@error/AppErrors";

let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("Create car specification", () => {
    beforeEach(() => {
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        carRepositoryInMemory = new CarRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carRepositoryInMemory,
            specificationRepositoryInMemory,
        );
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carRepositoryInMemory.create({
            name: "Car 2",
            description: "carro para passeio",
            available: true,
            license_plate: "ABC-123",
            dayle_rate: 32,
            fine_amount: 45,
            brand: "wolkswagen",
            category_id: "category"
        });

        const specification = await specificationRepositoryInMemory.create({
            name: "test",
            description: "test description"
        });

        const specification_id = [specification.id];
        const result = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specification_id
        });
        expect(result).toHaveProperty("specifications");
        expect(result.specifications.length).toBe(1);
    });

    it("should not be able to add a new specification in a no-exists car", async () => {
        const car_id = "Does not exist car";
        const specification_id = ["4321"];

        await expect( 
            createCarSpecificationUseCase.execute({ 
            car_id, 
            specification_id 
        })
        ).rejects.toEqual(new AppErrors("car doesn't exist!"));
    });
});