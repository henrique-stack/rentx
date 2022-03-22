import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { CreateRentalsUseCase } from "./CreateRentalsUseCase";
import { AppErrors } from "@error/AppErrors";
dayjs.extend(utc)

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carRepositoryInMemory: CarRepositoryInMemory;
let createRentalUseCase: CreateRentalsUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carRepositoryInMemory = new CarRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalsUseCase(
            dayjsDateProvider,
            rentalsRepositoryInMemory,
        );
    });

    it("should not be able to create a new rental if there's another open to the same user", async () => {    
        await rentalsRepositoryInMemory.create({
            car_id: "1234",
            expected_return_date: dayAdd24Hours,
            user_id: "test-1",
        });

        await expect( createRentalUseCase.execute({
            car_id: "12345",
            user_id: "test-1",
            expected_return_date: dayAdd24Hours,
        })
        ).rejects.toEqual(new AppErrors("there's a rental in progress for another user"));
  });

  it("should not be able to create a new rental if there's another open to the same car", async () => {
        await rentalsRepositoryInMemory.create({ 
            car_id: "12345",
            user_id: "test-1",
            expected_return_date: dayAdd24Hours,
        });

        await expect( createRentalUseCase.execute({
            car_id: "12345",
            user_id: "test-2",
            expected_return_date: dayAdd24Hours,
        })
        ).rejects.toEqual(new AppErrors("car unavailable"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect( createRentalUseCase.execute({
            car_id: "121212",
            user_id: "343434",
            expected_return_date: dayjs().toDate(),
        })
    )
    .rejects.toEqual(new AppErrors("Invalid return time!"));
});

  it("should be able to create a new rental", async () => {
    const car = await carRepositoryInMemory.create({
        available: true,
        brand: "Audi",
        category_id: "32092143",
        dayle_rate: 200,
        description: "Carro para passeio",
        fine_amount: 60,
        license_plate: "ABC-2343",
        name: "audi tt"
    });
    const rental = await createRentalUseCase.execute({
        car_id: car.id,
        user_id: "212121",
        expected_return_date: dayAdd24Hours,
    });

  expect(rental).toHaveProperty("id");
  expect(rental).toHaveProperty("start_date");
  });
});
