const { Subscribers, Messages } = require('../../../src/models');

/**
 * Get a subscriber
 * @param {ObjectId} Subscribers
 * @returns {Promise<Subscribers>}
 */
const getSubscriber = async (subscriber) => Subscribers.findOne({ subscriber });

/**
 * Get all topics subscribed to
 * @param {ObjectId} Subscribers
 * @returns {Promise<Subscribers>}
 */
const getAllTopicsSubscribedTo = async (subscriber) => (await getSubscriber(subscriber)).topics;

/**
 * Get message by topic
 * @param {ObjectId} topic
 * @returns {Promise<Messages>}
 */
const getMessageByTopic = async (topic) => await Messages.find({ topic }).sort({ createdAt: -1 });

/**
 * Get all subscribed data
 * @param {String} subscriber
 * @returns {Promise<Subscribers>}
 */
const getAllData = async (subscriber) => {
	const topics = await getAllTopicsSubscribedTo(subscriber);

	// let AllData = [];

	// for (let i = 0; i < topics.length; i++) {
	// 	const data = await getMessageByTopic(topics[i]);
	// 	AllData.push(...data);
	// }

	return topics;
};

module.exports = { getAllData, getSubscriber };
