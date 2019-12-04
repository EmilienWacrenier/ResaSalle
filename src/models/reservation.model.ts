module.exports = (sequelize, Sequelize) => {
    const reservation = sequelize.define('reservation', {
        reservationId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        startDate: {
            type: Sequelize.DATE
        },
        endDate: {
            type: Sequelize.DATE
        },
        object: {
            type: Sequelize.STRING(45)
        },
        state: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defautValue: true
        },
        user_id: {
            allowNull: false,
            type: Sequelize.INTEGER(11)
        },
        recurrence_id:  {
            allowNull: true,
            type: Sequelize.INTEGER(45)
        },
        room_id: {
            allowNull: false,
            type: Sequelize.INTEGER(45)
        }
    }, {
        tableName: "reservation",
        timestamps: false,
        freezeTableName: true,
    });

    reservation.associate = function(models){
        reservation.belongsTo(models.recurrence, {
            foreignKey: 'recurrence_id'
        });
        reservation.belongsTo(models.room, {
            foreignKey: 'room_id',
            onDelete: 'CASCADE'
        });
        reservation.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
        reservation.belongsToMany(models.user, {
            through: 'user_reservation',
            as: 'users',
            foreignKey: 'reservationId',
            otherKey: 'userId'
        })
    }

    return reservation;
};
