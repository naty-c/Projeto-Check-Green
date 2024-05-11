const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');

class LoginController {

/*
   #swagger.tags = ['Login'],
   #swagger.summary = 'Start new login'
   #swagger.parameters['body'] = {
       in: 'body',
       description: 'This endpoint will start login for a user',
       schema: {
           $email: 'yuki@email.com',
           $password: '#1Yukisecret'
       }
   #swagger.responses: {
       '201': {
           description: Ok
       }
       '401': {
           description: Invalid password
       }
       '404': {
           description: User not found
       }
       '500': {
           description: Failed to login
       }
   }
*/

    async login(req, res) {
        try {
            const { email, password } = req.body;
            console.log(email, password);
            
            const user = await User.findOne({ 
                where: { email:email } });
    
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
            return res.status(500).json({ message: "Failed to login" });
        }
    }
};

module.exports = new LoginController();