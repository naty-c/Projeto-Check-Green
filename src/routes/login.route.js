const { Router } = require('express')
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const loginRoutes = new Router();

loginRoutes.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        // Look for the user through the email
        const user = await User.findOne({ 
            where: { email:email } });

        // Verify if the user was found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password and the hashed password
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = sign({ email: user.email, id: user.id }, 
            process.env.SECRET_JWT, { expiresIn: "1d" });
        return res.status(200).send({ token });

    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(400).json({ message: "Failed to login" });
    }
});

module.exports = loginRoutes;
