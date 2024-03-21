import Joi from "joi";




const customErrorMessages: Record<string, string> = {
  "any.required": "{{#label}} is required",
  "string.min": "{{#label}} should have a minimum length of {{#limit}}",
  "string.email": "Please provide a valid email for {{#label}}",
  "any.only": "{{#label}} must match {{#valids}}",
};

export const signUpSchema = Joi.object({
  username: Joi.string()
    .required()
    .regex(/^[a-zA-Z0-9]*$/)
    .messages(customErrorMessages),
  email: Joi.string().email().required().messages(customErrorMessages),
  name: Joi.string().required().messages(customErrorMessages),
  password: Joi.string().min(6).required().messages(customErrorMessages),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages(customErrorMessages),
  status: Joi.string().valid("ACTIVE", "INACTIVE").default("ACTIVE"),
});

export const signInWithEmailSchema = Joi.object({
  email_or_username: Joi.string()
    .email()
    .required()
    .messages(customErrorMessages),
  password: Joi.string().min(6).required().messages(customErrorMessages),
});

export const signInWithUsernameSchema = Joi.object({
  email_or_username: Joi.string()
    .required()
    .regex(/^[a-zA-Z0-9]*$/)
    .messages(customErrorMessages),
  password: Joi.string().min(6).required().messages(customErrorMessages),
});