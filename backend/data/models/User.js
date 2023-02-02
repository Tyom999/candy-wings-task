const { omit: _omit } = require('lodash');
const { Model, DataTypes } = require('sequelize');

const { Jwt, Security, Util } = require('../../components');

class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
                accessTokenSalt: { type: DataTypes.STRING },
                name: { allowNull: false, type: DataTypes.STRING },
                email: { allowNull: false, type: DataTypes.STRING },
                password: { type: DataTypes.STRING, allowNull: false }
            },
            {
                sequelize,
                timestamps: true,
                tableName: 'user',
                hooks: { beforeSave: User.hookBeforeSave }
            }
        );
    }

    static async hookBeforeSave(user) {
        if (user.isNewRecord || user.changed('password')) {
            user.accessTokenSalt = Util.generateRandomString(6);
            user.password = await Security.generatePasswordHash(user.password);
        }
    }

    comparePassword(currentPassword = '') {
        return Security.validatePassword(currentPassword, this.password);
    }

    async generateToken() {
        return await Jwt.sign({ salt: this.accessTokenSalt, id: this.id });
    }

    toJSON() {
        const model = this.get();
        const hiddenFields = ['password', 'accessTokenSalt'];

        return _omit(model, hiddenFields);
    }
}

module.exports = User;
