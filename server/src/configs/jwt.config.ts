import { ResponseError } from "../middlewares/error.middleware";

function envToken(name: string): string {
  const value = process.env[name];
  if (!value) throw new ResponseError(400, `Missing env var: ${name}`);
  return value;
}

const jwtConfig = {
  access: {
    secret: envToken("JWT_ACCESS_SECRET"),
    expiresIn: envToken("JWT_ACCESS_EXPIRES_IN") || "15m",
  },
  refresh: {
    secret: envToken("JWT_REFRESH_SECRET"),
    expiresIn: envToken("JWT_REFRESH_EXPIRES_IN") || "7d",
  },
};

export default jwtConfig;
