import { container } from "tsyringe";
import "@shared/container/providers";
import { UsersRepository } from "@modules/account/infra/repositories/UsersRepository";
import { SpecificationsRepository } from "@modules/cars/infra/repositories/SpecificationsRepository";
import { CategoriesRepository } from "@modules/cars/infra/repositories/CategoriesRepository";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/repositories/CarsRepository";
import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { CarsImageRepository } from "@modules/cars/infra/repositories/CarsImageRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { RentalsRepository } from "@modules/rentals/infra/repositories/RentalsRepository";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "@modules/account/infra/repositories/UsersTokensRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
   CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
   SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
   UsersRepository
);

//detalhe importante é que em alguns arquivos, alteramos do plural para o singular
container.registerSingleton<ICarsRepository>(
  "CarsRepository",
   CarsRepository
);

container.registerSingleton<ICarsRepository>(
  "ListAvailableCars",
   CarsRepository
);

container.registerSingleton<ICarImageRepository>(
  "CarsImageRepository",
   CarsImageRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
   RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
   UsersTokensRepository
);