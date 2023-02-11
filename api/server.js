const express = require("express");
const server = express();
const tarifRouter = require("./tarifler/tarifler-router");

server.use(express.json());
server.use("/api/tarifler", tarifRouter);

server.use(
  ("*",
  (req, res) => {
    res.status(404).json({
      message: "not found",
    });
  })
);
module.exports = server;
