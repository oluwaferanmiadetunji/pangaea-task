const express = require('express');
const topicRoute = require('./topics');
const subscriberRoute = require('./subscriber');

const router = express.Router();

const defaultRoutes = [
	{
		path: '/topic',
		route: topicRoute,
	},
	{
		path: '/subscribe',
		route: subscriberRoute,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
