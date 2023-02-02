module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('message', {
            id: { type: Sequelize.UUID, primaryKey: true },
            text: { type: Sequelize.TEXT, allowNull: false },
            roomId: { type: Sequelize.UUID, allowNull: false, references: { model: 'room', key: 'id' } },
            userId: { type: Sequelize.UUID, allowNull: false, references: { model: 'user', key: 'id' } },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('message', { cascade: true });
    }
};
