const httpStatus = require('http-status');
const ApiError = require('../../../src/utils/ApiError');
const { Topics } = require('../../../src/models');

/**
 * Get topic
 * @param {ObjectId} id
 * @returns {Promise<Topics>}
 */
const getTopic = async (topic) => {
	return Topics.findOne({ topic });
};

/**
 * Create a topic
 * @param {Object} body
 * @returns {Promise<Topics>}
 */

const createTopic = async (body) => {
	const topic = await getTopic(body.topic);
	if (await getTopic(body.topic)) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Topic already exists');
	}
	const topic = await Topics.create(body);
	return topic;
};

module.exports = { createTopic, getTopic };
