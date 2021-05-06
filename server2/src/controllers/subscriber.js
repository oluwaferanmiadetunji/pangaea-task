const httpStatus = require('http-status');
const ApiError = require('../../../src/utils/ApiError');
const catchAsync = require('../../../src/utils/catchAsync');
const { SubscriberService } = require('../services');
const { trimSubscriber } = require('../../../src/utils/helpers');

const getAllData = catchAsync(async (req, res) => {
	const subscriber = await SubscriberService.getSubscriber(trimSubscriber(req.params.subscriber));

	if (!subscriber) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Subscriber not found');
	}

	const data = await SubscriberService.getAllData(trimSubscriber(req.params.subscriber));

	res.status(httpStatus.OK).send(data);
});

module.exports = { getAllData };
