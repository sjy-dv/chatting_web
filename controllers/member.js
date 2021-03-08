const db = require('../models');
const { hash, jwt, handler, sms, regex } = require('../utils');

const Member = db.member;
const { errorHandler } = handler;

module.exports = {
  SignUp: async (req, res) => {
    try {
      let { id, password, email, hp } = req.body;
      let check_email = regex.EmailCheck(email);
      if (!check_email) throw { code: 3 };
      let check_hp = regex.HpCheck(hp);
      if (!check_hp) throw { code: 3 };
      let hashing = hash.generateHash(password);
      const rows = await Member.create({
        id: id,
        password: hashing,
        email: email,
        hp: hp,
      });
      if (rows) return res.status(200).json({ result: true });
      else throw { code: 1 };
    } catch (err) {
      return res.status(400).send(errorHandler(req, err));
    }
  },

  ID_Check: async (req, res) => {
    try {
      let { id } = req.body;
      console.log(id);
      const rows = await Member.findOne({ where: { id: id } });
      console.log(rows);
      if (rows) return res.status(200).json({ result: false });
      res.status(200).json({ result: true });
    } catch (err) {
      return res.status(400).send(errorHandler(req, err));
    }
  },

  SignIn: async (req, res) => {
    try {
      let { id, password } = req.body;
      const rows = await Member.findOne({ where: { id: id } });
      if (!rows) throw { code: 4 };
      const check_password = hash.compareHash(password, rows.password);
      let token = jwt.createToken(rows.id);
      if (check_password) return res.status(200).send(token);
      else throw { code: 3 };
    } catch (err) {
      return res.status(400).send(errorHandler(req, err));
    }
  },

  AuthSMS: async (req, res) => {
    try {
      let { hp } = req.body;
      let send_sms = sms.Sending_AuthSMS(hp);
      if (!send_sms) throw { code: 1 };
      let authcode = (await send_sms).toString();
      return res.status(200).send(authcode);
    } catch (err) {
      return res.status(400).send(errorHandler(req, err));
    }
  },
};
