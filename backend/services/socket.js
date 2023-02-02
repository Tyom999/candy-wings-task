const { Op } = require('sequelize');
const { isEmpty: _isEmpty } = require('lodash');

const { User, Message, Room } = require('../data/models');
const { Jwt } = require('../components');
const config = require('../config');

const socketService = {
    init(io) {
        io.use(async (socket, next) => {
            const { authorization } = socket.handshake.auth;

            if (!authorization) {
                return next(new Error('Authentication Failed.'));
            }

            const payload = await Jwt.verify(authorization, config.JWT_SECRET);

            if (_isEmpty(payload)) {
                return next(new Error('Authentication Error'));
            }

            const user = await User.findByPk(payload.id);

            if (_isEmpty(user)) {
                return next(new Error('Authentication Failed.'));
            }

            socket.join(user.id);

            next();
        });

        io.on('connection', socket => {
            socket.on('joinRoom', async ({ user1Id, user2Id }) => {
                const [{ id: roomId }] = await Room.findOrCreate({
                    where: {
                        [Op.or]: [
                            { user1Id, user2Id },
                            { user1Id: user2Id, user2Id: user1Id }
                        ]
                    },
                    defaults: { user1Id, user2Id }
                }).catch(console.trace);

                socket.join(roomId);

                socket.on('roomSendMsg', async message => {
                    const { user1Id, user2Id } = message;

                    const { id: roomId } = await Room.findOne({
                        where: {
                            [Op.or]: [
                                { user1Id, user2Id },
                                { user1Id: user2Id, user2Id: user1Id }
                            ]
                        }
                    });

                    await Message.create({ text: message.text, userId: message.user1Id, roomId }).catch(console.trace);

                    io.to(roomId).emit('roomGetMsg', message);
                });
            });

            socket.on('leaveRoom', async ({ user1Id, user2Id }) => {
                const { id: roomId } = await Room.findOne({
                    where: {
                        [Op.or]: [
                            { user1Id, user2Id },
                            { user1Id: user2Id, user2Id: user1Id }
                        ]
                    }
                }).catch(console.trace);

                socket.leave(roomId);
                socket.removeAllListeners('roomGetMsg');
                socket.removeAllListeners('roomSendMsg');
            });
        });
    }
};

module.exports = socketService;
