import mongoose from "mongoose";
import { logger } from "./logger.js";

export const db = mongoose
  .connect(`${process.env.MONGO_DB_URL}`)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.info("Could not connect to MongoDB");
    logger.error(error);
    process.exit(1);
  });
