import { Schema } from "joi";
import { ResponseError } from "../middlewares/error.middleware";

const validation = function (schema: Schema, request: object) {
  const data = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (data.error) {
    throw new ResponseError(400, data.error.message);
  } else {
    return data.value;
  }
};

export default validation;
