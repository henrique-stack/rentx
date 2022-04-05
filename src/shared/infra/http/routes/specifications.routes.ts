import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationsController';
import { ensureAuthenticated } from '../midlewares/ensureAuthenticated';
import { ensureAdmin } from '../midlewares/ensureAdmin';
import { Router } from 'express';

const specificationRouter = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationsController();

specificationRouter.post("/", 
ensureAuthenticated,
ensureAdmin,
createSpecificationController.handle);

specificationRouter.get("/list",
ensureAuthenticated,
ensureAdmin,
listSpecificationController.handle);

export{ specificationRouter }; 