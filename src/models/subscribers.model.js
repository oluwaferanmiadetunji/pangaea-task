const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const subscribersSchema = mongoose.Schema(
	{
		subscriber: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		topics: {
			type: Array,
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
