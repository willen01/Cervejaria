import express from "express";

const PORT = 3333 || process.env.PORT;
const app = express();

app.listen(PORT, () => {
  console.log(`Server road on port ${PORT}`);
});
