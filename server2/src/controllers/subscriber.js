const httpStatus = require('http-status');
const ApiError = require('../../../src/utils/ApiError');
const catchAsync = require('../../../src/utils/catchAsync');
const { SubscriberService } = require('../services');
const { trimSubscriber } = require('../../../src/utils/helpers');

const subscribe = catchAsync(async (req, res) => {
	const subscriber = await SubscriberService.subscribe({ topic: req.params.topic, subscriber: trimSubscriber(req.body.url) });
	res.status(httpStatus.CREATED).send(subscriber);
});

const getSubscriber = catchAsync(async (req, res) => {
	const subscriber = await SubscriberService.getSubscriber(trimSubscriber(req.params.subscriber));

	if (!subscriber) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Subscriber not found');
	}

	res.status(httpStatus.OK).send(subscriber);
});

module.exports = { subscribe, getSubscriber };
