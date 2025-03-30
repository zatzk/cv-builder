import express from "express";
const app = express();
const port = process.env.PORT ?? "4200";

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("response sent");
});

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
