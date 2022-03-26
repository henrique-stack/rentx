import { Router } from 'express';
import { carRouter } from './cars.routes';
import { userRouter } from './users.routes';
import { rentalRoutes } from './rental.routes';
import { categorieRouter } from './categories.routes';
import { authenticateRouter } from './authenticate.routes';
import { specificationRouter } from './specifications.routes';
import { passwordRouter } from './password.routes';
const router = Router();

router.use("/cars", carRouter);
router.use("/users", userRouter);
router.use("/", authenticateRouter);
router.use("/rentals", rentalRoutes);
router.use("/password", passwordRouter);
router.use("/categories", categorieRouter);
router.use("/specifications", specificationRouter);

export { router };