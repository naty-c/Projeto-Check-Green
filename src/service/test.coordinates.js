const { getCoordinatesFromAddress } = require('../service/map.service');

async function getCoordinatesForPlace() {
    const address = "Parque Ecológico do Córrego Grande";
    try {
        const { latitude, longitude } = await getCoordinatesFromAddress(address);
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
    } catch (error) {
        console.error("Erro ao obter coordenadas:", error.message);
    }
}

getCoordinatesForPlace();