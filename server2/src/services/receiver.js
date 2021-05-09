const amqp = require('amqplib/callback_api');

module.exports = (cb) => {
	amqp.connect('amqp://localhost', function (error0, connection) {
		if (error0) {
			throw error0;
		}

		cb(connection);
	});
};
