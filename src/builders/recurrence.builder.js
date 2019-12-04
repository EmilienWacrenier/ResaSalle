const db = require('../config/db.config');
const Op = require('Sequelize').Op;

module.exports = {
    create_recurrence: function(req){
        return new Promise(async(resolve, reject) => {
            try {
                var createdRecurrence = await db.models.Recurrence.create({
                    label: req.body.labelRecurrence,
                    startDate: req.body.startDateRecurrence,
                    endDate: req.body.endDateRecurrence
                }).then(function(createdRecurrence){
                    if(createdRecurrence){
                        resolve(createdRecurrence)
                    }
                });
            } catch (err) {
                resolve(err);
            }
        });
    },


}