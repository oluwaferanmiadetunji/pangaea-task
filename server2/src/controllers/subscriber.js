const httpStatus = require('http-status');
const ApiError = require('../../../src/utils/ApiError');
const catchAsync = require('../../../src/utils/catchAsync');
const { SubscriberService } = require('../services');
const { trimSubscriber } = require('../../../src/utils/helpers');
const { ReceiverService } = require('../services');

const getAllData = catchAsync(async (req, res) => {
	const subscriber = await SubscriberService.getSubscriber(trimSubscriber(req.params.subscriber));

	if (!subscriber) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Subscriber not found');
	}

	const data = await SubscriberService.getAllData(trimSubscriber(req.params.subscriber));
	
	ReceiverService(function (connection) {
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
					console.log(' [*] Waiting for messages. To exit press CTRL+C');

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

	res.status(httpStatus.OK).send(data);
});

module.exports = { getAllData };
