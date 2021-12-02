import logger from "../utils/logger";
import db from "../db";
import { userCreateSchema } from "../utils/validationSchema";

const { User } = db.models;

export default class UserService {
  async handleUserCreateKafkaEven(data: any) {
    const { error } = userCreateSchema.validate(data);

    if (error) {
      // todo: handle error
      logger.info(
        "Validation error while handling kafka message",
        error.message
      );
      return;
    }

    try {
      const user: any = await User.findOrCreate(data);
      logger.info(`User created  ${user.username}`);
    } catch (err) {
      logger.info(
        "Validation error while handling kafka message, create user error",
        error.message
      );
    }
  }
}
