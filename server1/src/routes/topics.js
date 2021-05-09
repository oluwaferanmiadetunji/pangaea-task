const express = require('express');
const validate = require('../../../src/middlewares/validate');
const { TopicValidation } = require('../../../src/validations');
const { TopicController } = require('../controllers');

const router = express.Router();

router.post('/create', validate(TopicValidation.createTopic), TopicController.createTopic);
router.get('/:topic', validate(TopicValidation.getTopic), TopicController.getTopic);
router.get('/', TopicController.getTopics);

module.exports = router;
