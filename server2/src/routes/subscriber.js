const express = require('express');
const validate = require('../../../src/middlewares/validate');
const { SubscriberValidation } = require('../../../src/validations');
const { SubscriberController } = require('../controllers');

const router = express.Router();

router.post('/:topic', validate(SubscriberValidation.subscribe), SubscriberController.subscribe);
router.get('/:subscriber', validate(SubscriberValidation.getSubscriber), SubscriberController.getSubscriber);

module.exports = router;
