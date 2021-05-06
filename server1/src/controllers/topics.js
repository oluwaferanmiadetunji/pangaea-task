const httpStatus = require('http-status');
const ApiError = require('../../../src/utils/ApiError');
const catchAsync = require('../../../src/utils/catchAsync');
const { TopicService } = require('../services');

const createTopic = catchAsync(async (req, res) => {
	const topic = await TopicService.createTopic(req.body);
	res.status(httpStatus.CREATED).send(topic);
});

const getTopic = catchAsync(async (req, res) => {
	const topic = await TopicService.getTopic(req.params.topic);
	if (!topic) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Topic not found');
	}
	res.send(topic);
});

module.exports = { createTopic, getTopic };
