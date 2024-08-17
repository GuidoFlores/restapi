const jwt = require('jsonwebtoken');


// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
   

    // Obtener el token del encabezado de autorización
    const token = req.headers['token'];


    // Verificar si el token existe
    if (!token) {
        return res.status(408).json({ error: 'Token no proporcionado' });
    }

    // Verificar la validez del token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(408).json({ error: 'Token inválido o expirado' });
        }

        // Token válido, guardar la información decodificada en la solicitud y continuar
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;