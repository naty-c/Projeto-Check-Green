const validator = require('validator');
const User = require('../models/User');
const { Op } = require('sequelize');

async function validateUser(userData) {
    const { name, email, password, gender, birthday, CPF, address, phone } = userData;

    // Verify if name is not empty
    if (validator.isEmpty(name)) {
        throw new Error('Name cannot be empty.');
    }

    if (!validator.isLength(name, { min: 3, max: 33 })) {
        throw new Error('Name length should be between 3 and 33 characters.');
    }

    // Verify email format
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email format.');
    }

    // Verify password criteria
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password must have at least 8 characters, plus one digit, one lowercase letter, one uppercase letter and one special character.');
    }

    // Verify gender 
    if (!['Male', 'Female', 'Other'].includes(gender)) {
        throw new Error("Gender must be one of: 'Male', 'Female', 'Other'.");
    }

    // Verify birthday format
    if (!birthday.match(/\d{4}-\d{2}-\d{2}/gm)) {
        throw new Error('Invalid date format. Please use YYYY-MM-DD.');
    }

    // Verify if CPF have 11 numeric digits
    if (!/^\d{11}$/.test(CPF)) {
        throw new Error('CPF must have 11 numeric digits.');
    }

    // Verify if phone number is valid
    if (phone && !validator.isMobilePhone(phone, 'any', { strictMode: false })) {
        throw new Error('Invalid phone number.');
    }

    // Verify if address is not empty
    if (validator.isEmpty(address)) {
        throw new Error('Address cannot be empty.');
    }

    // Verify if email and CPF are already registered
   const existingUser = await User.findOne({ 
        where: {
            [Op.or]: [{ email }, { CPF }],
          },
        });

        if (existingUser) {
            const errorMessage = existingUser.email === email ? 'Email already registered.' : 'CPF already registered.';
            throw new Error(errorMessage);
          };

  // If all validations pass, return true
  return true;
}

module.exports = { validateUser };
