const axios = require("axios");

const catchAsync = (fn) => {
	return (req, res, next) => {
		// fn(req, res, next).catch(err => next(err));
		fn(req, res, next).catch(next);
	};
};

exports.getAllCryptos = catchAsync(async (req, res, next) => {
	const url =
		"https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?sort=cmc_rank&limit=15";
	const api_key = "6796d69a-0fed-4a11-86c5-723252f3e152";

	const response = await axios.get(url, {
		headers: {
			"X-CMC_PRO_API_KEY": api_key,
		},
	});

	const cryptos = response.data.data.map(({ id, name, symbol }) => ({
		id,
		name,
		symbol,
	}));
	res.status(200).json({
		status: "success",
		data: {
			cryptos,
		},
	});
});

exports.getAllCurrencies = catchAsync(async (req, res, next) => {
	const url = "https://pro-api.coinmarketcap.com/v1/fiat/map?limit=15";
	const api_key = "6796d69a-0fed-4a11-86c5-723252f3e152";

	const response = await axios.get(url, {
		headers: {
			"X-CMC_PRO_API_KEY": api_key,
		},
	});

	const currencies = response.data.data.map(({ id, name, sign, symbol }) => ({
		id,
		name,
		sign,
		symbol,
	}));
	res.status(200).json({
		status: "success",
		data: {
			currencies,
		},
	});
});

exports.convertCurrToCryp = catchAsync(async (req, res, next) => {
    console.log(req.body.cryptocurrency, req.body.currency);
	const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${req.body.cryptocurrency}&convert=${req.body.currency}`;
	const api_key = "6796d69a-0fed-4a11-86c5-723252f3e152";

	const response = await axios.get(url, {
		headers: {
			"X-CMC_PRO_API_KEY": api_key,
		},
	});

	const price = response.data.data[req.body.cryptocurrency]['quote'][req.body.currency]['price'];

	res.status(200).json({
		status: "success",
		data: {
			price,
		},
	});
});
