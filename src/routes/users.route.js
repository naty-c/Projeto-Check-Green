const { Router } = require('express'); 
const User = require('../models/User');
const { auth } = require('../middlewares/auth');
const { registerUser } = require('../service/register.user');
const { validateUser } = require('../service/user.validator');

const userRoutes = new Router();

async function findUserById(id) {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    } catch (error) {
        throw new Error('Error finding user by ID.');
    }
}

// Endpoint POST - Create (public route)
userRoutes.post('/', async (req, res) => {   
    
/*
   #swagger.tags = ['Users'],
   #swagger.summary = 'Create new user'
   #swagger.parameters['body'] = {
       in: 'body',
       description: 'This endpoint will create new user',
       schema: {
           $name: 'Yuki Cross',
           $email: 'yuki@email.com',
           $password: 'yukipassword',
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
});

//Endpoint GET - List (require auth)
userRoutes.get('/', auth, async (req, res) => {

    /*
    #swagger.tags = ['Users'],
    #swagger.summary = 'List all users'
    #swagger.parameters['parameterName'] = {
        in: 'body',
        description: 'This endpoint will list all users',
        schema: {
            $name: 'Yuki Cross',
            $email: 'yuki@email.com',
            $password: 'yukipassword',
            $gender: 'Female',
            $birthday: '2008-08-08',
            $CPF: '88888888888',
            $address: 'Street 08, 08 - VN',
            $phone: '4888888888'
        },
            {
            $name: 'Yuri Cross',
            $email: 'yuri@email.com',
            $password: 'yuripassword',
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
    #swagger.responses[404] = { description: No users found. }
    #swagger.responses[500] = { description: Uh-oh! Unable to list all users. }
*/

    try {
        const users = await User.findAll();

        if (!users.length === 0) {
            return res.status(404).json({ message: 'No users found.' });
        }        

        res.json(users);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Uh-oh! Unable to list all users.' });
    }
});

//Endpoint GET - List by ID (require auth)
userRoutes.get('/:id', auth, async (req, res) => {

    /*
    #swagger.tags = ['Users'],
    #swagger.summary = 'List user by ID'
    #swagger.parameters['id'] = {
        in: 'body',
        description: 'This endpoint will list a user by ID',
        schema: {
            $name: 'Yuki Cross',
            $email: 'yuki@email.com',
            $password: 'yukipassword',
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
});

//Endpoint PUT - Update by ID (require auth)
userRoutes.put('/:id', auth, async (req, res) => {

    /*
    #swagger.tags = ['Users'],
    #swagger.summary = 'Update a user by ID'
    #swagger.parameters['id'] = {
        in: 'body',
        description: 'This endpoint will update a user by ID',
        schema: {
            $name: 'Yuki Soma',
            $email: 'yukisoma@email.com',
            $password: 'yukisomapassword',
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
        '500': {
            description: Uh-oh! Unable to delete user.
        }
    }
*/

    try {
        const { id } = req.params;
        const user = await findUserById(id);

        await user.update(req.body);
            res.status(200).json({ message: 'Hooray! User successfuly updated.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Uh-oh! Unable to update user.' });
    }
});

//Endpoint DELETE - Remove by ID (require auth)
userRoutes.delete('/:id', auth, async (req, res) => {

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
        '400': {
            description: Sorry! User not found!
        }
        '500': {
            description: Uh-oh! Unable to delete user.
        }
    }
*/

    try {
        const { id } = req.params;
        const user = await findUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'Sorry! User not found!' });
    }

        await user.destroy();

        return res.status(200).json({ message: 'User deleted.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Uh-oh! Unable to delete user.' });
    }
});

module.exports = userRoutes;
