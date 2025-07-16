const express = require('express');

const router = express.Router();

const {
  getAllRegisterDetails,
  getRegisterDetails,
  createRegisterDetails,
  updateRegisterDetails,
  deleteRegisterDetails,
} = require('../controllers/registerDetails');

router.route('/').get(getAllRegisterDetails);
router.route('/').post(createRegisterDetails);
router.route('/:id').get(getRegisterDetails);
router.route('/:id').patch(updateRegisterDetails);
router.route('/:id').delete(deleteRegisterDetails);

module.exports = router;
