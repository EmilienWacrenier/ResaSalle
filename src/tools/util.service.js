const moment = require('moment');
const momentz = require('moment-timezone');
//const dateTools = require('./date.tool');
//const int = require("../tools/validation/int");
const Joi = require("@hapi/joi");

/**
 * Méthode permettant de vérifier la validité de chaque valeur d'un objet json
 * @sync
 * @param json l'objet à traiter
 * @return Array contenant les clés associées aux valeurs invalides
 */
module.exports.valeurIncorrecte = json => {
  const errorObj = [];
    Joi.validate(
      json,
      int.identifiants,
      async (err, value) => {
        if (err !== null) {
          errorObj.push(json);
        }
      });
  return errorObj;
};

/**
 * Méthode permettant de vérifier qu'une ou plusieurs valeurs d'un objet ne sont pas "null" ou "undefined"
 * @sync
 * @param constraints : Array, les attributs obligatoires à retrouver dans l'objet
 * @param object : Object, l'objet à analyser
 * @return boolean or Array
 */
module.exports.isNotNullOrUndefined = (constraints, object) => {
  if (Array.isArray(constraints)) {
    let isNotUndefined = true;
    constraints.forEach(constraint => {
      if (
        object[constraint] === undefined ||
        object[constraint] === null ||
        object[constraint].length <= 0
      ) {
        isNotUndefined = false;
      }
    });
    return isNotUndefined;
  }
  return (
    object[constraints] !== undefined ||
    object[constraints] !== null ||
    object[constraints].length > 0
  );
};




module.exports.getTimezone = () => {
  return momentz.tz(new Date(), "Europe/Paris").format().slice(-6);
};