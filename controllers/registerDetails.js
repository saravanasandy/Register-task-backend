const Register = require('../models/RegisterDetails');
const User = require('../models/User');

const getAllRegisterDetails = async (req, res) => {
  const registers = await Register.find({ createdBy: req.user.userId }).sort(
    'createdAt'
  );
  res.status(200).json({ registers });
};

const getRegisterDetails = async (req, res) => {
  const {
    user: { userId },
    params: { id: registerId },
  } = req;

  console.log('userId:', userId);
  console.log('registerId:', registerId);

  const register = await Register.findOne({
    _id: registerId,
    createdBy: userId,
  });

  // console.log(register);

  if (!register) {
    throw new Error(`No Register with id ${registerId}`);
  }
  res.status(201).json({ register });
};

const createRegisterDetails = async (req, res) => {
  // res.json(req.user);
  // res.json(req.body);
  req.body.createdBy = req.user.userId;
  const register = await Register.create(req.body);
  res.status(200).json({ register });
};

const updateRegisterDetails = async (req, res) => {
  const {
    body: { name, email },
    user: { userId },
    params: { id: registerId },
  } = req;

  if (name === '' || email === '') {
    throw new Error('name or email fields are not empty');
  }
  const register = await Register.findByIdAndUpdate(
    { _id: registerId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!register) {
    throw new Error(`No register with id ${register}`);
  }
  res.status(200).json({ register });
};

const deleteRegisterDetails = async (req, res) => {
  const {
    user: { userId },
    params: { id: registerId },
  } = req;
  const register = await Register.findOneAndDelete({
    _id: registerId,
    createdBy: userId,
  });

  if (!register) {
    throw new Error(`No register with id ${register}`);
  }

  res.status(200).json({ register, msg: 'deleted successfully' });
};

module.exports = {
  getAllRegisterDetails,
  getRegisterDetails,
  createRegisterDetails,
  updateRegisterDetails,
  deleteRegisterDetails,
};
