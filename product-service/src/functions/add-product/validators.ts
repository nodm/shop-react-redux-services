import * as Joi from 'joi';
import { ValidationError, ValidationErrorItem } from 'joi';

const reqBodySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required(),
  description: Joi.string()
    .min(5)
    .max(100)
    .required(),
  imageUrl: Joi.string()
    .required(),
  price: Joi.number()
    .min(0.01)
    .max(999_999_999.99)
    .required(),
  count: Joi.number()
    .integer()
    .min(1)
    .max(1_000_000)
    .required(),
});

export const validateReqBody = (body: unknown): null | { message: string, details: string | string[] } => {
  const { error } = reqBodySchema.validate(body,{
    abortEarly: false,
    convert: false,
    allowUnknown: false,
  });

  if (!error) {
    return null;
  }

  const details = error instanceof ValidationError
    ? error.details.map((element: ValidationErrorItem) => element.message)
    : [(error as Error).message];

  return { message: 'Incorrect input', details };
};
