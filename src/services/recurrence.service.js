const recurrenceBuilder = require('../builders/recurrence.builder');

module.exports = {
    createRecurrence: function (req) {
        return new Promise(async (resolve, reject) => {
            const libellesRecurrence = ['hebdomadaire', 'quotidien', 'mensuel', 'annuel'];
            try {
                if(!libellesRecurrence.includes(req.body.labelRecurrence)){ 
                    resolve({'error':'Libelle non valide'})
                }
                var newRecurrence = recurrenceBuilder.create_recurrence(req);
                resolve(newRecurrence);
            } catch (err) {
                console.log(err);
            }
        });
    },

}