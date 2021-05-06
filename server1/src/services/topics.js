const httpStatus = require('http-status');
const ApiError = require('../../../src/utils/ApiError');
const { Topics } = require('../../../src/models');
const { url2 } = require('../../../src/config/config');

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
	if (await getTopic(body.topic)) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Topic already exists');
	}

	return await Topics.create(body);
};

/**
 * Subscribe to a topic
 * @param {String} topic
 * @param {String} subscriber
 * @returns {Promise<Topics>}
 */

const subscribeToTopic = async (topic, subscriber) => {
	const topicData = await getTopic(topic);

	if (topicData.subscribers.includes(subscriber)) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Already subscribed');
	}

	await Topics.updateOne({ topic }, { $addToSet: { subscribers: [subscriber] } });

	return Object.freeze({
		url: `${url2}/subscribers/${subscriber}`,
		topic,
	});
};

module.exports = { createTopic, getTopic, subscribeToTopic };
