module.exports = (sequelize, Sequelize) => {
    const recurrence = sequelize.define('recurrence', {
        recurrenceId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        label: {
            type: Sequelize.STRING(45)
        },
        startDate: {
            type: Sequelize.DATE
        },
        endDate: {
            type: Sequelize.DATE
        }
    }, {
        tableName: "recurrence",
        timestamps: false,
        freezeTableName: true,
    });

    return recurrence;
};