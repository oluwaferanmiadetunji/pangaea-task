const topicRoute = require('./topics');
const subscriberRoute = require('./subscriber');
const publishRoute = require('./publish');

module.exports = (app) => {
	app.use('/publish', publishRoute);
	app.use('/topic', topicRoute);
	app.use('/subscribe', subscriberRoute);
};
