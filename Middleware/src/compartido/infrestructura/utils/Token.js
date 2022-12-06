const jwt = require('jsonwebtoken');
require('dotenv').config();

export function generarToken(usuario) {
    return jwt.sign(usuario, process.env.SECRET, {expiresIn: '30m'});
}

export function validarToken(req, res, next) {
    const accessToken = req.headers['authorization'];
    if (!accesToken) res.send('Acceso denegado');

    jwt.verify(accessToken, process.env.SECRET, (err, usuario) => {
        if(err){
            res.send('Acceso denegado, token expirado o incorrecto');
        }else{
            next();
        }
    });
}

/*res.header('authorization', accessToken).json({
    mensaje: 'Usuario auntenticado',
    token: token
});

*/