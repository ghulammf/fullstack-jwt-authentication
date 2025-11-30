const jwtConfig = {
  access: {
    secret: process.env.JWT_ACCESS_SECRET!,
    expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN || "15m") as any,
  },
  refresh: {
    secret: process.env.JWT_REFRESH_SECRET!,
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as any,
  },
};

export { jwtConfig };
