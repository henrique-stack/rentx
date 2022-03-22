import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoryController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAuthenticated } from '../midlewares/ensureAuthenticated';
import { ensureAdmin } from '../midlewares/ensureAdmin';
const categorieRouter = Router();

// ======= setup upload files ======= //
const upload = multer({
    dest: "./tmp"
});

const importCategoryController = new ImportCategoryController(); 
const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();

categorieRouter.post("/import",
ensureAuthenticated,
ensureAdmin,
upload.single("file"), 
importCategoryController.handle);

categorieRouter.post("/", 
ensureAuthenticated,
ensureAdmin,
createCategoryController.handle);

categorieRouter.get("/",
listCategoryController.handle);

export { categorieRouter };