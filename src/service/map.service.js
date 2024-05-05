const axios = require('axios');

async function getCoordinatesFromAddress(address) {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);

        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return { latitude: lat, longitude: lon };
        } else {
            throw new Error('No coordinates found for the provided address.');
        }
    } catch (error) {
        throw new Error('Failed to fetch coordinates from OpenStreetMap API.');
    }
}

module.exports = { getCoordinatesFromAddress };

