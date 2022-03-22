import { Router } from 'express';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthenticated } from '../midlewares/ensureAuthenticated';
import { ensureAdmin } from '../midlewares/ensureAdmin';

const specificationRouter = Router();
const createSpecificationController = new CreateSpecificationController();

specificationRouter.post("/", 
ensureAuthenticated,
ensureAdmin,
createSpecificationController.handle);

export{ specificationRouter }; 