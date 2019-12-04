var jwt = require('jsonwebtoken');
const JWT_SIGNATURE = '4TSL6RNxRxVOdhGQQOGUoFbSv2yIfYjNvNDEJyiVFqGd7p7dH4pC3tIeVR0yNISBwYAfJiSGJbe4HlWO';

module.exports.generateTokenForUser = function (idUser, role_id) {
    return jwt.sign({
        idUser: idUser,
        role: role_id,
    },
        JWT_SIGNATURE,
        {
            expiresIn: '40m'
        })
}

module.exports.verifyToken = async (req, res, next) => {
    // Récupération du token dans le headers
    const token = req.headers['authorization'];
    try {
        // Vérification de la signature du token
        const verifiedToken = jwt.verify(token.slice(7), JWT_SIGNATURE);
        if (!verifiedToken.idUser) throw new Error('IdUser Null');
        // Génération d'un nouveau token pour renouveler le temps d'expiration
        const newToken = module.exports.generateTokenForUser(
            verifiedToken.idUser, verifiedToken.role_id);
        res.set('authorization', 'Bearer ' + newToken);
    }
    catch (error) {
        return res.status(401).json({ 'Erreur': 'Jeton non valide', 'Console':error });
    }
    next();
}

module.exports.verifyRole = (neededRole) => async (req, res, next) => {
    const token = req.headers['authorization'];
    try {
        const verifiedToken = await jwt.decode(token.slice(7));
        if (neededRole != verifiedToken.role) {
            return res.status(403).send('Accès non autorisé');
        }
    } catch (error) {
        //console.log("========Message Erreur========")
        //console.log(error);
        return res.status(401).json(error);
    }
    next();
}

