import express from "express";
import { Transmitter } from "./Transmitter";

const app = express();
const port = 3000;

app.use(express.text());

app.post("/trasmit", (req, res) => {
  const transmitter = new Transmitter();

  const output = transmitter.transmit(req.body);

  res.send(output);
});

app.listen(port, () => {
  console.log(`Martian robots app listening on port ${port}`);
});
