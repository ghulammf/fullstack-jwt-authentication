interface User {
  username: string;
  email: string;
  role: "ADMIN" | "USER";
}

export default User;
