const express = require("express");
const cryptoController = require("../CryptoController/cryptoController");

const router = express.Router();

router.
    route("/")
    .get(cryptoController.getAllCryptos);

router
    .route("/currencies")
    .get(cryptoController.getAllCurrencies);

router
    .route("/convert")
    .post(cryptoController.convertCurrToCryp);

module.exports = router;
