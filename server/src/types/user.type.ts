import { Role } from "@prisma/client";

interface User {
  username: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export default User;
