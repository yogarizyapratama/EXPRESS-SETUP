import userModel from "../models/user.model.js";
import { logger } from "../config/logger.js";

export const createUser = async (payload) => {
  try {
    const user = await userModel.create(payload);
    return user;
  } catch (error) {
    logger.info("Cannot create user");
    logger.error(error);
  }
};

export const findUserbyEmail = async (email) => {
  try {
    const user = await userModel.findOne({ email });
    return user;
  } catch (error) {
    logger.info("Cannot find user");
    logger.error(error);
  }
};
