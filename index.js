import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.get("/users", async (req, res) => {
  try {
    const user = await prisma.user.findMany();
    res.status(200).json({
      status: "200:ok",
      msg: user,
    });
  } catch (err) {
    res.status(500).json({
      msg: err,
    });
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.status(200).json({
      status: "200:ok",
      msg: user,
    });
  } catch (err) {
    res.status(500).json({
      msg: err,
    });
  }
});

app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);
