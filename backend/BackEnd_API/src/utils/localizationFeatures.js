function calcLimits(latitude, longitude, radius) {
    const earthKmRadius = 6371; // Raio médio da Terra em quilômetros

    // Convertendo para radians
    const radiansLatitude = (Math.PI * latitude) / 180;
    const radiansLongitude = (Math.PI * longitude) / 180;

    // Calculando variações de latitude e longitude para o raio especificado
    const varLatitude = (radius / earthKmRadius) * (180 / Math.PI);
    const varLongitude = (radius / earthKmRadius) * (180 / Math.PI) / Math.cos(radiansLatitude);

    // Calculando coordenadas máximas e mínimas
    const latMax = latitude + varLatitude;
    const latMin = latitude - varLatitude;
    const longMax = longitude + varLongitude;
    const longMin = longitude - varLongitude;

    return {
        latMax,
        latMin,
        longMax,
        longMin
    };
}

export default { calcLimits };