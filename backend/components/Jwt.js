const jwt = require('jsonwebtoken');

const config = require('../config');

class JWT {
    /**
     * @param data
     * @return String
     */
    async sign(data) {
        return jwt.sign(data, config.JWT_SECRET);
    }

    /**
     * @param token
     * @return String
     */
    async verify(token) {
        try {
            return jwt.verify(token, config.JWT_SECRET);
        } catch (ex) {
            return '';
        }
    }
}

module.exports = new JWT();
