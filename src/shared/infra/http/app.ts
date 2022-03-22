import "reflect-metadata";
import "@shared/container";
import "express-async-errors";
import createConnection from "@shared/infra/http/typeorm";
import express, { Request, Response, NextFunction } from "express";
import { router } from "@shared/infra/http/routes";
import { AppErrors } from "@error/AppErrors";

import swaggerFile from "../../../swagger.json";
import swaggerUI from "swagger-ui-express";

const app = express();
createConnection();

app.use(express.json());
app.use(router);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(
    (err : Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppErrors) {
        return response.status(err.statusCode).json({
        message: err.message,
        });
    };
    return response.status(500).json({
        status: "error",
        message: `Internal server - error ${err.message}`,
    });
 });

export { app };
