const User = require('../models/User');
const bcrypt = require("bcryptjs");

async function registerUser(userData) {
    const { name, email, password, gender, birthday, CPF, address, phone } = userData;
    
    try {
      const salt = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        gender,
        birthday,
        CPF,
        address,
        phone
      });
  
      return newUser; 
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  }
  
  module.exports = { registerUser };