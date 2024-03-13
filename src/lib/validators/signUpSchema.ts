import Joi from "joi";

export const signUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  status: Joi.string().valid("ACTIVE", "INACTIVE").default("ACTIVE"),
});
