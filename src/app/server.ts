import express from "express";
import { router } from "./routes";

const PORT = 3333 || process.env.PORT;
const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server road on port ${PORT}`);
});
