const { Router } = require('express');
const Place = require('../models/Place');
const { auth } = require('../middlewares/auth');
const { getCoordinatesFromAddress } = require('../service/map.service');

const placeRoutes = new Router();

// Endpoint POST - Create a new destination (private route)
placeRoutes.post('/', auth, async (req, res) => {
    try {
        const { name, description, location, latitude, longitude, accessibility, category, rating } = req.body;

        // Verify if all required fields are being provided
        if (!name || !description || !location || !latitude || !longitude || !accessibility || !category || !rating) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Get coordinates from OpenStreetMap
        const { lat, lon } = await getCoordinatesFromAddress(location);

        // Create a new destination associated with the authenticated user
        const newPlace = await Place.create({
            name,
            description,
            location,
            latitude: lat,
            longitude: lon,
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
});

// Endpoint GET - List all destinations of the authenticated user (private route)
placeRoutes.get('/', auth, async (req, res) => {
    try {
        const userPlaces = await Place.findAll({ where: { user_id: req.user.id } });

        if (!userPlaces.length === 0) {
            return res.status(404).json({ message: 'No destinations found for the authenticated user.' });
        }        

        res.json(userPlaces);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Uh-oh! Unable to list destinations for the authenticated user.' });
    }
});

// Endpoint GET - Get details of a specific destination of the authenticated user (private route)
placeRoutes.get('/:id', auth, async (req, res) => {    
    try {
        const { place_id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid id.' });
        }

        const userPlace = await Place.findOne({ where: { id: place_id, user_id: req.user.id } });

        if (!userPlace) {
            return res.status(404).json({ message: 'Sorry! Destination not found for the authenticated user.' });
        }

        res.json(userPlace);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Uh-oh! Unable to get details of the destination for the authenticated user.' });
    }
});

// Endpoint PUT - Update information of a specific destination of the authenticated user (private route)
placeRoutes.put('/:id', auth, async (req, res) => {
    try {
        const { place_id } = req.params;
        const { name, description, location, latitude, longitude, accessibility, category, rating } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid id.' });
        }

        const userPlace = await Place.findOne({ where: { id: place_id, user_id: req.user.id } });

        if (!userPlace) {
            return res.status(404).json({ message: 'Sorry! Destination not found for the authenticated user.' });
        }

        await userPlace.update({ name, description, location, latitude, longitude, accessibility, category, rating });

        res.status(200).json({ message: 'Destination successfully updated.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Uh-oh! Unable to update destination.' });
    }
});

// Endpoint DELETE - Remove a specific destination of the authenticated user (private route)
placeRoutes.delete('/:id', auth, async (req, res) => {
    try {
        const { place_id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid id.' });
        }

        const userPlace = await Place.findOne({ where: { id: place_id, user_id: req.user.id } });

        if (!userPlace) {
            return res.status(404).json({ message: 'Sorry! Destination not found for the authenticated user.' });
        }

        await userPlace.destroy();

        return res.status(200).json({ message: 'Destination deleted.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Uh-oh! Unable to delete destination.' });
    }
});

module.exports = placeRoutes;