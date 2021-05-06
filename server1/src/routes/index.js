const express = require('express');
const topicRoute = require('./topics');

const router = express.Router();

const defaultRoutes = [
	{
		path: '/topic',
		route: topicRoute,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
