const express = require('express');
const subscriberRoute = require('./subscriber');

const router = express.Router();

const defaultRoutes = [
	{
		path: '/',
		route: subscriberRoute,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
