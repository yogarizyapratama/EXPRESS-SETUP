import Joi from "joi";

export const createUserValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().allow("", null),
  });

  return schema.validate(payload);
};

export const loginValidation = (payload) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(payload);
};

export const refreshSessionValidation = (payload) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required(),
  });

  return schema.validate(payload);
};
