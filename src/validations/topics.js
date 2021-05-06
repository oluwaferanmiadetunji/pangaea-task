const Joi = require('joi');

const createTopic = {
	body: Joi.object().keys({
		topic: Joi.string().required(),
	}),
};

const getTopic = {
	params: Joi.object().keys({
		topic: Joi.string().required(),
	}),
};

module.exports = {
	createTopic,
	getTopic,
};
