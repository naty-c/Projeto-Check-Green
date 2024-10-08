const User = require('../models/User');
const { registerUser } = require('../service/register.user');
const { validateUser } = require('../service/user.validator');
const Place = require('../models/Place');

async function findUserById(id) {
    try {
        const user = await User.findByPk(id);
        return user;
    } catch (error) {
        throw new Error('Error finding user by ID.');
    }
}

class UserController {

    async create(req, res) {
/*
   #swagger.tags = ['Users'],
   #swagger.summary = 'Create new user'
   #swagger.parameters['body'] = {
       in: 'body',
       description: 'This endpoint will create new user',
       schema: {
           $name: 'Yuki Cross',
           $email: 'yuki@email.com',
           $password: '#1Yukisecret',
           $gender: 'Female',
           $birthday: '2008-08-08',
           $CPF: '88888888888',
           $address: 'Street 08, 08 - VN',
           $phone: '4888888888'
       }
   }
   #swagger.responses: {
       '201': {
           description: Ok
       }
       '400': {
           description: Email already registered, CPF already registered.
       }
       '500': {
           description: Uh-oh! Unable to create a new user.
       }
   }
*/
        try {
            const userData = { ...req.body };
    
            await validateUser(userData);
    
            const newUser = await registerUser(userData);
    
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
    
            if (error.message.includes('email')) {
                res.status(400).json({ error: 'Email already registered.' });
              } else if (error.message.includes('CPF')) {
                res.status(400).json({ error: 'CPF already registered.' });
              } else {
                res.status(500).json({ error: 'Uh-oh! Unable to create a new user.' });
              }
        }
    }

    async showAll(req, res) {
/*
    #swagger.tags = ['Users'],
    #swagger.summary = 'List all users'
    #swagger.parameters['parameterName'] = {
        in: 'body',
        description: 'This endpoint will list all users',
        schema: {
            $name: 'Yuki Cross',
            $email: 'yuki@email.com',
            $password: '#1Yukisecret',
            $gender: 'Female',
            $birthday: '2008-08-08',
            $CPF: '88888888888',
            $address: 'Street 08, 08 - VN',
            $phone: '4888888888'
        },
            {
            $name: 'Yuri Cross',
            $email: 'yuri@email.com',
            $password: '#2Yurisecret',
            $gender: 'Male',
            $birthday: '2008-08-08',
            $CPF: '99999999999',
            $address: 'Street 09, 09 - VN',
            $phone: '4899999999'
        }
    }
    #swagger.security = [{
        "bearerAuth": []
    }]
    #swagger.responses: {
        '201': {
           description: Ok
        }
        '404': { 
            description: No users found. 
        }
        '500': { 
            description: Uh-oh! Unable to list all users. 
        }
*/
        try {
            const users = await User.findAll();
    
            if (users.length === 0) {
                return res.status(404).json({ message: 'No users found.' });
            }        
    
            res.json(users);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Uh-oh! Unable to list all users.' });
        }
    }

    async showOne(req, res) {
/*
    #swagger.tags = ['Users'],
    #swagger.summary = 'List user by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'This endpoint will list a user by ID',
        schema: {
            $name: 'Yuki Cross',
            $email: 'yuki@email.com',
            $password: '#1Yukisecret',
            $gender: 'Female',
            $birthday: '2008-08-08',
            $CPF: '88888888888',
            $address: 'Street 08, 08 - VN',
            $phone: '4888888888'
        }
    }
    #swagger.security = [{
        "bearerAuth": []
    }]
    #swagger.responses: {
        '201': {
           description: Ok
        }
        '404': {
            description: No users found.
        }
        '500': {
            description: Uh-oh! Unable to find user.
        }
    }
*/
        try {
            const { id } = req.params;
            const user = await findUserById(id);
    
            if (!user) {
                return res.status(404).json({ message: 'Sorry! User not found!' });
            }
    
            res.json(user)
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Uh-oh! Unable to find user.' });
        }
    }

    async update(req, res) {
/*
    #swagger.tags = ['Users'],
    #swagger.summary = 'Update a user by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'This endpoint will update a user by ID',
        schema: {
            $name: 'Yuki Soma',
            $email: 'yukisoma@email.com',
            $password: '3Yukisecret',
            $gender: 'Male',
            $birthday: '2020-10-20',
            $CPF: '20202020202',
            $address: 'Street 20, 20 - FB',
            $phone: '4820202020'
        }
    }
    #swagger.security = [{
        "bearerAuth": []
    }]
    #swagger.responses: {
        '200': {
            description: Hooray! User successfuly updated
        }
        '403': {
            description: You do not have permission to update this user.
        }
        '404': {
            description: User not found.
        }
        '500': {
            description: Uh-oh! Unable to update user.
        }
    }
*/
        try {
            const { id } = req.params;
            const user = await findUserById(id);

            if(!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            if (req.user.id !== user.id) {
                return res.status(403).json({ error: 'You do not have permission to update this user.' });
            }
    
            await user.update(req.body);
                res.status(200).json({ message: 'Hooray! User successfuly updated.' });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Uh-oh! Unable to update user.' });
        }
    }

    async delete(req, res) {
/*
    #swagger.tags = ['Users'],
    #swagger.summary = 'Delete user by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'This endpoint will delete a user by ID',
        schema: {
            type: string,
        required: true,
        description: string ID of user to delete
        }
    }
    #swagger.security = [{
        "bearerAuth": []
    }]
    #swagger.responses: {
        '200': {
            description: User deleted.
        }
        '403': {
            description: This user cannot be deleted because there are associated places.   
        }
        '404': {
            description: User not found.
        }
        '500': {
            description: Uh-oh! Unable to delete user.
        }
    }
*/
        try {
            const { id } = req.params;
            const user = await findUserById(id);

            if(!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

        // Verify if there are any associated places to a specific user
        const placesCount = await Place.count({ where: { user_id: user.id } });

        if (placesCount > 0) {
            return res.status(403).json({ error: 'This user cannot be deleted because there are associated places.' });
        }
    
            await user.destroy();
    
            return res.status(200).json({ message: 'User deleted.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Uh-oh! Unable to delete user.' });
        }
    }
};

module.exports = new UserController();