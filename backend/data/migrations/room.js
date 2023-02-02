module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('room', {
            id: { type: Sequelize.UUID, primaryKey: true },
            user1Id: { type: Sequelize.UUID, allowNull: false, references: { model: 'user', key: 'id' } },
            user2Id: { type: Sequelize.UUID, allowNull: false, references: { model: 'user', key: 'id' } },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('room', { cascade: true });
    }
};
