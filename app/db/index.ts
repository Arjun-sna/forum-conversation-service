import { Sequelize } from "sequelize";
import createAssociations from "./associations";
import logger from "../utils/logger";
import conversationModelDefiner from "./conversation";

const env = process.env.NODE_ENV || "development";
const dbConfig = require("../../config/config.json")[env];
const modelDefiners = [conversationModelDefiner];

const getSequelizeInstance = () => {
  const { database, username, password } = dbConfig;
  const config = {
    ...dbConfig,
    // logging: logger.info,
  };
  return new Sequelize(database, username, password, config);
};

const sequelize = getSequelizeInstance();

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

createAssociations(sequelize);

export async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error);
    process.exit(1);
  }
}

export default sequelize;
