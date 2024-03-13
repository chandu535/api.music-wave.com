import express from "express";
import * as http from "http";
import routes from "./routes/index";
import AppConfig from "./config/app";
import bodyParser from "body-parser";

import "./lib/db";

class App {
  public app: express.Application;
  public server: any;
  public mongoUrl: string = AppConfig.db.mongo_connection_string as string;

  public mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.config();
    this.app.use("/" + "v1.0", routes);
  }

  private config(): void {
    this.app.use(bodyParser.json({ limit: "5mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "5mb", extended: false }));
  }
}

const app = new App();
export const server = app.server;
