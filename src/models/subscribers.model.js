const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const subscribersSchema = mongoose.Schema(
	{
		topicID: {
			type: String,
			required: true,
			trim: true,
		},
        subscriber: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	},
);

// add plugin that converts mongoose to json
subscribersSchema.plugin(toJSON);
subscribersSchema.plugin(paginate);

/**
 * @typedef Subscribers
 */
const Subscribers = mongoose.model('Subscribers', subscribersSchema);

module.exports = Subscribers;
