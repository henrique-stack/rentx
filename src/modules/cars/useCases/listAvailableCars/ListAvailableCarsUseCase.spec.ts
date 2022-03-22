import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

  describe("List Cars", () => {
     beforeEach(() => {
         carRepositoryInMemory = new CarRepositoryInMemory();
         listCarsUseCase = new ListAvailableCarsUseCase(carRepositoryInMemory);
     });

     it("should be able list all cars", async () => {

      const car = await carRepositoryInMemory.create({
          name: "Corola",
          description: "Carro para passeio",
          category_id: "category_id",
          license_plate: "ABC-4532",
          brand: "Toyota",
          fine_amount: 35.00,
          dayle_rate: 200
      });
      const result = await listCarsUseCase.execute({ name: "Corola" });

      expect([car]).toEqual(result);
    });
  });