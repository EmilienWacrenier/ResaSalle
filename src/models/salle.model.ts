module.exports = (sequelize, Sequelize) => {
    const room = sequelize.define('room', {
        roomId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING(45)
        },
        area: {
            allowNull: true,
            type: Sequelize.STRING(45)
        },
        capacity: {
            allowNull: false,
            type: Sequelize.INTEGER
        }
    }, {
        tableName: "room",
        timestamps: false,
        freezeTableName: true,
    });

    room.associate = function(models) {
      room.hasMany(models.reservation, {
        foreignKey: 'room_id',
        onDelete: 'CASCADE'
      });
    };

    return room;
};
