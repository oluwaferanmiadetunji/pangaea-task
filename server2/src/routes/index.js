const subscriberRoute = require('./subscriber');

module.exports = (app) => {
	app.use('/', subscriberRoute);
};
