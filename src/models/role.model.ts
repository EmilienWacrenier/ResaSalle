module.exports = (sequelize, Sequelize) => {
    const role = sequelize.define('role', {
        roleId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    }, {
        tableName: "role",
        timestamps: false,
        freezeTableName: true,
    });

    

    return role;
};