import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    ENABLE_KAFKA: Joi.bool()
      .required()
      .description("Should enable kafka consumer"),
    KAFKA_BROKER_URL: Joi.when("ENABLE_KAFKA", {
      is: true,
      then: Joi.string().required(),
      otherwise: Joi.string(),
    }),
    KAFKA_SASL_USERNAME: Joi.when("ENABLE_KAFKA", {
      is: true,
      then: Joi.string().required(),
      otherwise: Joi.string(),
    }),
    KAFKA_SASL_PASSWORD: Joi.when("ENABLE_KAFKA", {
      is: true,
      then: Joi.string().required(),
      otherwise: Joi.string(),
    }),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
  },
  kafka: {
    enabled: envVars.ENABLE_KAFKA,
    brokerUrl: envVars.KAFKA_BROKER_URL,
    saslUsername: envVars.KAFKA_SASL_USERNAME,
    saslPassword: envVars.KAFKA_SASL_PASSWORD,
  },
};
