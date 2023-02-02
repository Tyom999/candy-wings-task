const { Op } = require('sequelize');
const { isEmpty: _isEmpty } = require('lodash');

const { ErrorMessages } = require('../constants');
const { User } = require('../data/models');

class UserHandler {
    async findAll(req, res) {
        try {
            const { id } = req.user;
            const { userName, page = 1, limit = 10 } = req.query;

            const offset = +(page - 1) * 10;

            const condition = _isEmpty(userName)
                ? { id: { [Op.ne]: id } }
                : { id: { [Op.ne]: id }, name: { [Op.like]: `%${userName}%` } };

            const users = await User.findAll({ where: condition, offset, limit: +limit });

            return res.status(200).json({ users });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async create(req, res) {
        try {
            const { email, name, password } = req.body;

            await User.create({ email, name, password });

            return res.status(201).json({});
        } catch (e) {
            return res.status(500).json({ message: e.message, errors: e.errors });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });

            if (_isEmpty(user) || !(await user.comparePassword(password))) {
                return res.status(400).json({ message: ErrorMessages.INVALID_CREDENTIALS });
            }

            return res.status(200).json({ token: await user.generateToken(), user });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }
}

module.exports = new UserHandler();
