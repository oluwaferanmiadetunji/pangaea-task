const httpStatus = require('http-status');
const ApiError = require('../../../src/utils/ApiError');
const { Topics } = require('../../../src/models');

/**
 * Get topic
 * @param {ObjectId} id
 * @returns {Promise<Topics>}
 */
const getTopic = async (topic) => {
	console.log(topic);
	return Topics.findOne({ topic });
};

/**
 * Create a topic
 * @param {Object} body
 * @returns {Promise<Topics>}
 */

const createTopic = async (body) => {
	if (await getTopic(body.topic)) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Topic already exists');
	}

	return await Topics.create(body);
};

module.exports = { createTopic, getTopic };
