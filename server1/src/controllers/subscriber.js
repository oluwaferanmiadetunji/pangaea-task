const httpStatus = require('http-status');
const catchAsync = require('../../../src/utils/catchAsync');
const { SubscriberService } = require('../services');
const { trimSubscriber } = require('../../../src/utils/helpers');

const subscribe = catchAsync(async (req, res) => {
	const subscriber = await SubscriberService.subscribe({ topic: req.params.topic, subscriber: trimSubscriber(req.body.url) });
	res.status(httpStatus.CREATED).send(subscriber);
});

module.exports = { subscribe };
