const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const topicsSchema = mongoose.Schema(
	{
		topic: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	},
);

// add plugin that converts mongoose to json
topicsSchema.plugin(toJSON);
topicsSchema.plugin(paginate);

/**
 * @typedef Topics
 */
const Topics = mongoose.model('Topics', topicsSchema);

module.exports = Topics;
