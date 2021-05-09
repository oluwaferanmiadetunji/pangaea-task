const amqp = require('amqplib/callback_api');

module.exports = (data) => {
	let response = null;
	amqp.connect('amqp://localhost', function (error0, connection) {
		if (error0) {
			throw error0;
		}
		connection.createChannel(function (error1, channel) {
			if (error1) {
				throw error1;
			}
			var exchange = 'topic_logs';

			channel.assertExchange(exchange, 'topic', {
				durable: false,
			});

			channel.assertQueue(
				'',
				{
					exclusive: true,
				},
				function (error2, q) {
					if (error2) {
						throw error2;
					}
					console.log(' [*] Waiting for logs. To exit press CTRL+C');

					data.forEach(function (key) {
						channel.bindQueue(q.queue, exchange, key);
					});

					channel.consume(
						q.queue,
						function (msg) {
							console.log(" [x]'%s'", msg.content.toString());
						},
						{
							noAck: true,
						},
					);
				},
			);
		});
	});
	// if (data?.length > 0) {
	// 	const topic = 'topic5';

	// 	amqp.connect('amqp://localhost', function (error0, connection) {
	// 		if (error0) {
	// 			throw error0;
	// 		}

	// 		connection.createChannel(function (error1, channel) {
	// 			if (error1) {
	// 				throw error1;
	// 			}

	// 			const exchange = 'topic_logs';

	// 			channel.assertQueue(
	// 				exchange,
	// 				'',
	// 				{
	// 					durable: false,
	// 					exclusive: true,
	// 				},
	// 				function (error2, q) {
	// 					if (error2) {
	// 						throw error2;
	// 					}

	// 					console.log(' [*] Waiting for messages');

	// 					data.forEach(function (key) {
	// 						channel.bindQueue(q.queue, exchange, key);
	// 					});
	// 				},
	// 			);

	// 			channel.consume(
	// 				topic,
	// 				function (msg) {
	// 					console.log(' [x] Received %s', msg.content.toString());
	// 				},
	// 				{
	// 					noAck: true,
	// 				},
	// 			);
	// 		});
	// 	});
	// }
};
