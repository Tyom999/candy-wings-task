const { Model, DataTypes } = require('sequelize');

class Message extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
                text: { type: DataTypes.TEXT }
            },
            {
                sequelize,
                timestamps: true,
                tableName: 'message'
            }
        );
    }

    static associate(models) {
        Message.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });

        Message.belongsTo(models.Room, { as: 'room', foreignKey: 'roomId' });
    }
}

module.exports = Message;
