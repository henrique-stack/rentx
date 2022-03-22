import { CreateRentalsController } from "@modules/rentals/useCases/createRentals/CreateRentalsController";
import { ensureAuthenticated } from "../midlewares/ensureAuthenticated";
import { Router } from "express";
import { ListRentalsUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsUserController";

const createRentalsController = new CreateRentalsController();
const listRentalsController = new ListRentalsUserController();
const rentalRoutes = Router();

rentalRoutes.post("/",
    ensureAuthenticated,
    createRentalsController.handle    
);

rentalRoutes.get("/user",
 ensureAuthenticated,
 listRentalsController.handle);

export { rentalRoutes };