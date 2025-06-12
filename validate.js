import Joi from "joi";

export const schoolSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  address: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

