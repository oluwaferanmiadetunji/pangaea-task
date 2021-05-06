const httpStatus = require('http-status');
const catchAsync = require('../../../src/utils/catchAsync');
const { PublishService } = require('../services');

const publishTopic = catchAsync(async (req, res) => {
	const topic = await PublishService.publishTopic({ data: req.body, topic: req.params.topic });
	res.status(httpStatus.CREATED).send(topic);
});

module.exports = { publishTopic };
