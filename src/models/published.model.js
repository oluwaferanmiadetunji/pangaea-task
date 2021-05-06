const { any } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const publishedSchema = mongoose.Schema(
	{
		topicId: {
			type: String,
			required: true,
			trim: true,
		},
		data: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

// add plugin that converts mongoose to json
publishedSchema.plugin(toJSON);
publishedSchema.plugin(paginate);

/**
 * @typedef Published
 */
const Published = mongoose.model('Published', publishedSchema);

module.exports = Published;
