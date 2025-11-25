import Joi from "joi";

const registerValidation = Joi.object({
  username: Joi.string().max(40).trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(70).required(),
  confirm_password: Joi.ref("password"),
});

const loginValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export { registerValidation, loginValidation };
