require("dotenv").config();
const express = require("express");
const http = require("http");
const logger = require("morgan");
const cors = require("cors");
const { sequelize } = require("./models");
const path = require("path");

const PORT = process.env.PORT || 8000;
const BASE_URL = process.env.BASE_URL || "/api";

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*", credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server up & running...",
    client: req.headers["user-agent"],
  });
});

app.get(BASE_URL, (req, res) => {
  res.status(200).json({
    message: "Server up & running...",
    client: req.headers["user-agent"],
  });
});

const authRouter = require("./routers/auth");
const carRouter = require("./routers/car");
const uploadRouter = require("./routers/upload");

app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/cars`, carRouter);
app.use(`${BASE_URL}/uploads`, uploadRouter);

app.use("/assets", express.static(path.join(__dirname, "public")));

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});

server.listen(PORT, async () => {
  console.log(`Server is up & running on *:${PORT}`);
  await sequelize.authenticate();
  console.log("Database connected.");
});
