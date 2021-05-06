const express = require('express');
const validate = require('../../../src/middlewares/validate');
const { PublishValidation } = require('../../../src/validations');
const { PublishController } = require('../controllers');

const router = express.Router();

router.post('/:topic', validate(PublishValidation.publish), PublishController.publishTopic);

module.exports = router;
