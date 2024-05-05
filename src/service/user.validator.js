const validator = require('validator');
const User = require('../models/User');
const { Op } = require('sequelize');

async function validateUser(userData) {
  const { name, email, password, CPF, address, phone } = userData;

  // Name Validation
    if (validator.isEmpty(name)) {
        throw new Error('Name cannot be empty.');
    } else if (name.length < 3 || name.length > 33) {
        throw new Error('Name must be between 3 and 33 characters.');
    }

  // Email Validation
    if (validator.isEmpty(email)) {
        throw new Error('Email cannot be empty.');
    } else if (!validator.isEmail(email)) {
        throw new Error('Invalid email format.');
    }

  // Password Validation
  if (!validator.isStrongPassword(password)) {
    throw new Error('Password must be strong: minimum 8 characters, 1 digit, 1 lowercase, 1 uppercase, 1 special character.');
  }

  // CPF Validation
  if (!/^\d{11}$/.test(CPF)) {
    throw new Error('CPF must have 11 numeric digits.');
  }

  // Address Validation
  if (validator.isEmpty(address)) {
    throw new Error('Address cannot be empty.');
  }

  // Phone Number Validation
  if (phone && !validator.isMobilePhone(phone, 'any', { strictMode: false })) {
    throw new Error('Invalid phone number: Must be a mobile number.');
  }

  // Unique Email and CPF Check
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email }, { CPF }],
    },
  });

  if (existingUser) {
    const errorMessage = existingUser.email === email ? 'Email already registered.' : 'CPF already registered.';
    throw new Error(errorMessage);
  }

  // All validations pass
  return true;
}

module.exports = { validateUser };