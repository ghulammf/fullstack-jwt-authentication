enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

interface User {
  username: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
