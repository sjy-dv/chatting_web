const jwt = require('jsonwebtoken');
const { ACCESS_KEY } = process.env;
const db = require('../models');
const Member = db.member;
const Dao = require('../daos/dao');
const dao = new Dao();

module.exports = {
  createToken: (payload) => {
    const token = jwt.sign({ userid: payload.toString() }, ACCESS_KEY, {
      algorithm: 'HS256',
      expiresIn: '1y',
    });
    return token;
  },

  verifyToken: (token) => {
    let decoded = jwt.verify(token, ACCESS_KEY);
    return decoded;
  },

  checkToken: async (data) => {
    let check = await dao.findById(Member, data);
    return check;
  },
};
