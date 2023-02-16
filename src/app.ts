import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import Controller from "./utils/controller.interface";

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private async initialiseDatabaseConnection() {
    try {
      await mongoose.connect(`${process.env.DATABASE_URL}`);
      console.log("Database Connected Successfully!");
    } catch (error) {
      console.log("Error Occured while connecting to the DB: ", error);
    }
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }

  public listen(): express.Application {
    this.express.listen(this.port, () => {
      console.log(`App running on PORT: ${this.port}`);
    });
    return this.express;
  }

  public get() {
    this.express.get("/", (req: Request, res: Response) => {
      res.json({ message: "server is live" });
    });
  }
}

export default App;
