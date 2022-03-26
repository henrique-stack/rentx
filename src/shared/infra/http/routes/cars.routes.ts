import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { CreateDevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/CreateDevolutionRentalController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../midlewares/ensureAuthenticated";
import { ensureAdmin } from "../midlewares/ensureAdmin";
import uploadConfig from "@config/upload";
import { Router } from "express";
import  multer from "multer";

const rentalDevolutionController = new CreateDevolutionRentalController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecifications = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();
const createCarController = new CreateCarController();
const carRouter = Router();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carRouter.post("/",
ensureAuthenticated,
ensureAdmin,
createCarController.handle);

//this route use id from car
//at paramater the at paramater.
//for do the requests
//to make the requesitions
carRouter.post("/specifications/:id",
ensureAuthenticated,
ensureAdmin,
createCarSpecifications.handle);

carRouter.post("/images/:id", 
ensureAuthenticated,
ensureAdmin,
upload.array("images"),
uploadCarImageController.handle);

carRouter.get("/available", 
listAvailableCarsController.handle);

carRouter.post("/devolution/:id", 
ensureAuthenticated, 
ensureAdmin, 
rentalDevolutionController.handle);

export { carRouter };