import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),

  PORT: Joi.number().port().default(3000),

  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().default('user'),
  DB_PASS: Joi.string().default('password'),
  DB_NAME: Joi.string().default('mydb'),
});
