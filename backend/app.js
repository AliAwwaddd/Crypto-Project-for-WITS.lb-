const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

const globalErrorHandler = require("./CryptoController/errorController");
const cryptoRoutes = require("./routes/cryptoRoutes");

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});


app.get("/hello", (req, res) => {
	res.status(200).json({ messageToAli: "Hello, world" });
});

app.use("/api/cryptos", cryptoRoutes);
app.use(globalErrorHandler);

module.exports = app;
