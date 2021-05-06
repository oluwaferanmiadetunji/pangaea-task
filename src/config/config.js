const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string().valid('production', 'development', 'test'),
		PORT1: Joi.number().description('Port Number'),
		PORT2: Joi.number().description('Port Number'),
		MONGODB_URL: Joi.string().required().description('Mongo DB url'),
	})
	.unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
	env: envVars.NODE_ENV || 'development',
	port1: envVars.PORT1,
	port2: envVars.PORT2,
	mongoose: {
		url: envVars.MONGODB_URL,
		options: {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},
};
