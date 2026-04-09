import { app, PORT } from "./applications/app";

app.listen(PORT, function () {
  console.log(`server is running on http://localhost:${PORT}`);
});
