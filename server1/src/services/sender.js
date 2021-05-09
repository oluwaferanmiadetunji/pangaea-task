const amqp = require('amqplib/callback_api');

module.exports = ({ topic, data }) => {
	amqp.connect('amqp://localhost', function (error0, connection) {
		if (error0) {
			throw error0;
		}
		connection.createChannel(function (error1, channel) {
			if (error1) {
				throw error1;
			}
			var exchange = 'topic_logs';
			var msg = JSON.stringify({ topic, data });

			channel.assertExchange(exchange, 'topic', {
				durable: false,
			});
			channel.publish(exchange, topic, Buffer.from(msg));
			console.log(" [x] Sent %s:'%s'", topic, msg);
		});
	});
};
