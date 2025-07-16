const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashedPass = await bcrypt.hash(password, salt);

  const tempUser = { name, email, password: hashedPass };
  if (!name || !email || !password) {
    throw new Error('please provide name, email and password');
  }
  const user = await User.create({ ...tempUser });
  const token = user.createJWT();
  res.status(201).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error('Pls Provide Email & Password');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid Details');
  }

  console.log(user);

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Error('Invalid Credentials');
  }

  const token = user.createJWT();
  res.status(200).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
