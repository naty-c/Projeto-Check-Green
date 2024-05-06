const { getCoordinatesFromAddress } = require('../service/map.service');

async function getCoordinatesForPlace() {
    const address = "Reserva Biológica Marinha do Arvoredo";
    try {
        const { latitude, longitude } = await getCoordinatesFromAddress(address);
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
    } catch (error) {
        console.error("Erro ao obter coordenadas:", error.message);
    }
}

getCoordinatesForPlace();