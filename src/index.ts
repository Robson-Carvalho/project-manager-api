import { Request, Response, NextFunction } from "express";
import { router } from "./router";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3001;
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    const app = express();

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");

      next();
    });
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(router);

    app.listen(port, () => {
      console.log(
        `✅ Server connected to MongoDB Atlas successfully \n 🚀 Server is running on http://localhost:${port}`
      );
    });
  })
  .catch(() =>
    console.log(
      "❌ Error connected to MongoDB Atlas successfully \n 🛑 Server is not running"
    )
  );
