const Place = require('../models/Place');
const { getCoordinatesFromAddress } = require('../service/map.service');
const { Op } = require('sequelize');

class PlaceController {

    async create(req, res) {
/*
   #swagger.tags = ['Places'],
   #swagger.summary = 'Create new place'
   #swagger.parameters['body'] = {
       in: 'body',
       description: 'This endpoint will create new place by authenticated user',
       schema: {
           $name: 'Parque Ecológico do Córrego Grande',
           $description: 'O Parque Ecológico do Córrego Grande é uma das principais áreas verdes de Florianópolis...',
           $location: 'Córrego Grande',
           $latitude: '-27.59658405',
           $longitude: '-48.51019818035506',
           $accessibility: 'Accessible',
           $category: 'Trilha',
           $rating: '5'
       }
   }
    #swagger.security = [{
        "bearerAuth": []
    }]
   #swagger.responses: {
       '201': {
           description: Ok
       }
       '400': {
           description: All fields are required.
       }
       '500': {
           description: Uh-oh! Unable to create a new destination.
       }
   }
*/
        try {
            const { name, description, location, accessibility, category, rating } = req.body;
    
            if (!name || !description || !location || !accessibility || !category || !rating) {
                return res.status(400).json({ error: 'All fields are required.' });
            }
    
            // Get coordinates from OpenStreetMap
            const { latitude, longitude } = await getCoordinatesFromAddress(location);
    
            if (isNaN(latitude) || isNaN(longitude)) {
                throw new Error('Latitude and longitude must be valid numbers.');
            }
    
            const newPlace = await Place.create({
                name,
                description,
                location,
                latitude,
                longitude,
                accessibility,
                category,
                rating,
                user_id: req.user.id // Associating the destination with the authenticated user
            });
    
            res.status(201).json(newPlace);
              
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Uh-oh! Unable to create a new destination.' });
        }
    }

    async showAll(req, res) {
/*
    #swagger.tags = ['Places'],
    #swagger.summary = 'List places'
    #swagger.parameters['parameterName'] = {
        in: 'query',
        description: 'This endpoint will list all places for an authenticated user or list by filter using query parameters (name, location, category)',
        schema: {
           $name: 'Parque Ecológico do Córrego Grande',
           $description: 'O Parque Ecológico do Córrego Grande é uma das principais áreas verdes de Florianópolis...',
           $location: 'Córrego Grande',
           $latitude: '-27.59658405',
           $longitude: '-48.51019818035506',
           $accessibility: 'Accessible',
           $category: 'Trilha',
           $rating: '5'
        },
            {
           $name: 'Parque Ecológico do Córrego Grande',
           $description: 'O Parque Ecológico do Córrego Grande é uma das principais áreas verdes de Florianópolis...',
           $location: 'Córrego Grande',
           $latitude: '-27.59658405',
           $longitude: '-48.51019818035506',
           $accessibility: 'Accessible',
           $category: 'Trilha',
           $rating: '5'
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
           description: No destinations found for the authenticated user.
       }
       '500': {
           description: Uh-oh! Unable to list destinations for the authenticated user.
       }
    }
*/
        try {
            const { name, location, category } = req.query;

            const whereClause = { user_id: req.user.id };

            if (name || location || category) {
                whereClause[Op.or] = []; 
            
                if (name) {
                    const namePattern = `%${name}%`;
                    whereClause[Op.or].push({ name: { [Op.like]: namePattern } });
                }
            
                if (location) {
                    const locationPattern = `%${location}%`;
                    whereClause[Op.or].push({ location: { [Op.like]: locationPattern } });
                }
            
                if (category) {
                    const categoryPattern = `%${category}%`;
                    whereClause[Op.or].push({ category: { [Op.like]: categoryPattern } });
                }
            }
        
            const userPlaces = await Place.findAll({ where: whereClause });

            if (userPlaces.length === 0) {
                return res.status(404).json({ message: 'No destinations found for the authenticated user.' });
            }        

            res.json(userPlaces);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Uh-oh! Unable to list destinations for the authenticated user.' });
        }
    }

    async showOne(req, res) {
/*
    #swagger.tags = ['Places'],
    #swagger.summary = 'List place by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'This endpoint will list a place by ID only for an authenticated user',
        schema: {
           $name: 'Parque Ecológico do Córrego Grande',
           $description: 'O Parque Ecológico do Córrego Grande é uma das principais áreas verdes de Florianópolis...',
           $location: 'Córrego Grande',
           $latitude: '-27.59658405',
           $longitude: '-48.51019818035506',
           $accessibility: 'Accessible',
           $category: 'Trilha',
           $rating: '5'
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
            Sorry! Destination not found for the authenticated user.
        }
        '500': {
            description: Uh-oh! Unable to get details of the destination for the authenticated user.
        }
    }
*/
        try {
            const { id } = req.params;
    
            const userPlace = await Place.findOne({ where: { id: id, user_id: req.user.id } });
    
            if (!userPlace) {
                return res.status(404).json({ message: 'Sorry! Destination not found for the authenticated user.' });
            }
    
            res.json(userPlace);
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Uh-oh! Unable to get details of the destination for the authenticated user.' });
        }
    }

    async update(req, res) {
/*
    #swagger.tags = ['Places'],
    #swagger.summary = 'Update a place by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'This endpoint will update a place by ID only for an authenticated user',
        schema: {
           $name: 'Parque Ecológico do Córrego Grande',
           $description: 'O Parque Ecológico do Córrego Grande é uma das principais áreas verdes de Florianópolis...',
           $location: 'Córrego Grande',
           $latitude: '-27.59658405',
           $longitude: '-48.51019818035506',
           $accessibility: 'Accessible',
           $category: 'Trilha',
           $rating: '5'
        }
    }
    #swagger.security = [{
        "bearerAuth": []
    }]
    #swagger.responses: {
        '200': {
            description: Destination successfully updated.
        }
        '400': {
            description: Sorry! Destination not found for the authenticated user.
        }
        '500': {
            description: Uh-oh! Unable to update destination.
        }
    }
*/
        try {
            const { id } = req.params;
            const { name, description, location, latitude, longitude, accessibility, category, rating } = req.body;
    
            const userPlace = await Place.findOne({ where: { id: id, user_id: req.user.id } });
    
            if (!userPlace) {
                return res.status(404).json({ message: 'Sorry! Destination not found for the authenticated user.' });
            }
    
            await userPlace.update({ name, description, location, latitude, longitude, accessibility, category, rating });
    
            res.status(200).json({ message: 'Destination successfully updated.' });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Uh-oh! Unable to update destination.' });
        }
    }

    async delete(req, res) {
/*
    #swagger.tags = ['Places'],
    #swagger.summary = 'Delete place by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'This endpoint will delete a place by ID only for an authenticated user',
        schema: {
            type: string,
        required: true,
        description: string ID of place to delete
        }
    }
    #swagger.security = [{
        "bearerAuth": []
    }]
    #swagger.responses: {
        '200': {
            description: Destination deleted.
        }
        '400': {
            description: Sorry! Destination not found for the authenticated user.
        }
        '500': {
            description: Uh-oh! Unable to delete destination.
        }
    }
*/
        try {
            const { id } = req.params;
    
            const userPlace = await Place.findOne({ where: { id: id, user_id: req.user.id } });
    
            if (!userPlace) {
                return res.status(404).json({ message: 'Sorry! Destination not found for the authenticated user.' });
            }
    
            await userPlace.destroy();
    
            return res.status(200).json({ message: 'Destination deleted.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Uh-oh! Unable to delete destination.' });
        }
    }
};

module.exports = new PlaceController();