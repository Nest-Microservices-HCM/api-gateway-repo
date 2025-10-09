import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
  // AUTHENTICATION_SERVICE_HOST: string;
  // AUTHENTICATION_SERVICE_PORT: number;
}

const envsSchema = Joi.object<EnvVars>({
  PORT: Joi.number().required(),
  NATS_SERVERS: Joi.array().items(Joi.string().uri()).required(),
  // AUTHENTICATION_SERVICE_HOST: Joi.string().required(),
  // AUTHENTICATION_SERVICE_PORT: Joi.number().required(),
}).unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
  // authenticationMicroserviceHost: envVars.AUTHENTICATION_SERVICE_HOST,
  // authenticationMicroservicePort: envVars.AUTHENTICATION_SERVICE_PORT,
};
