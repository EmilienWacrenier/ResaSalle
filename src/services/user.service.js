const userBuilder = require('../builders/user.builder');
const bcrypt = require('bcrypt');
const jwt = require('../interceptors/jwt');

const REGEX = require('../tools/validation/regex');

module.exports.get_users = () => {
    return new Promise(async (resolve, reject) => {
        const user = await userBuilder.findUsers();
        return resolve({code: 200, result: user});
    })
}

module.exports.get_user = (req) => {
    return new Promise(async (resolve, reject) => {
        const user = await userBuilder.findUser(req);//findUser à coder ?
        resolve(user);
    })
}

module.exports.get_user_by_id = (req) => {
    return new Promise(async (resolve,reject) => {
        const user = await userBuilder.findUserById(req);
        return resolve({code: 200, result: user});
    })
}

module.exports.inscription = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Vérification des paramètres
            if (req.body.lastName == null || req.body.firstName == null || req.body.das == null ||
                req.body.email == null || req.body.pwd == null) {
                return resolve({ code: 400, result: 'Champs null' });
            }
            if (req.body.das.length != 7) {
                return resolve({ code: 400, result: 'Das non valide' });
            }
            if (req.body.lastName.length > 45 || req.body.firstName.length > 45 || req.body.pwd.length < 8) {
                return resolve({ code: 400, result: 'Longueur des champs' });
            }
            if (!REGEX.email.test(req.body.email)) {
                return resolve({ code: 400, result: 'Email non valide' });
            }
            // L'utilisateur existe t'il déjà?
            const existingUser = await userBuilder.findUserByEmailOrByDas(req);
            if (existingUser != null) {
                return resolve({ code: 400, result: 'Utilisateur déjà présent dans la bdd' });
            }
            else {
                // Création de l'utilisateur avec hashage de mdp
                bcrypt.hash(req.body.pwd, 5, function (err, bcryptedPassword) {
                    const createdUser = userBuilder.createUser(req, bcryptedPassword)
                        .then(function (createdUser) {
                            return resolve({ code: 200, result: createdUser });
                        });
                })
            }
        }
        catch (err) {
            console.log(err)
            return resolve({ code: 400, result: err });
        }
    });
}

module.exports.connexion = (req) => {
    return new Promise(async (resolve, reject) => {
        // Récupération des paramètres
        let email = req.query.email;

        let pwd = req.query.pwd;
        // Vérification des paramètres
        if (email == null || pwd == null) {
            return resolve({ code: 400, result: 'Email ou pwd non renseigné' });
        }
        else {
            // Récupération du user
            let user = await userBuilder.findUserByEmail(req);
            if (user == null) {
                // Si le user n'existe pas
                return resolve({ code: 404, result: 'utilisateur non existant' });
            }
            else {
                // Comparaison du mot de passe
                bcrypt.compare(pwd, user.pwd, function (err, res) {
                    if (res) {
                        toResolve = {
                            'userId': user.userId,
                            'lastName': user.lastName,
                            'firstName': user.firstName,
                            'token': jwt.generateTokenForUser(user.idUser, user.role_id)
                        }
                        return resolve({ code: 200, result: toResolve });
                    }
                    else {
                        return resolve({ code: 400, result: 'mot de passe incorrect' });
                    }
                });
            }
        }
    });
}
