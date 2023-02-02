const { Model, DataTypes } = require('sequelize');

class Room extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true }
            },
            {
                sequelize,
                timestamps: true,
                tableName: 'room'
            }
        );
    }

    static associate(models) {
        Room.belongsTo(models.User, { as: 'user1', foreignKey: 'user1Id' });
        Room.belongsTo(models.User, { as: 'user2', foreignKey: 'user2Id' });
    }
}

module.exports = Room;
