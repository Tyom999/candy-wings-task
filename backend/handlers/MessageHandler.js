const { QueryTypes } = require('sequelize');
const { template: _template } = require('lodash');

const { sequelize } = require('../data/models');
const { Query } = require('../constants');

class MessageHandler {
    async findAll(req, res) {
        try {
            const { id: user1Id } = req.user;
            const { page = 1, limit = 10, user2Id } = req.query;

            const offset = (page - 1) * limit;
            const messageQuery = _template(Query.roomMessage)({ offset, limit, user1Id, user2Id });

            const messages = await sequelize.query(messageQuery, { type: QueryTypes.SELECT });

            return res.status(200).json({ messages, page });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }
}

module.exports = new MessageHandler();
