import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),

  PORT: Joi.number().port().default(3000),

  JWT_SECRET: Joi.string().required(),
  JWT_TTL: Joi.number(),
  JWT_REFRES_TTL: Joi.number(),

  DATABASE_URL: Joi.string().default('localhost'),
});
