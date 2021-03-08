const bcrypt = require('bcryptjs');
const { SALT } = process.env;

module.exports = {
  generateHash: (password) => {
    const salt = bcrypt.genSaltSync(Number(SALT));
    const hashpw = bcrypt.hashSync(password, salt);
    return hashpw;
  },

  compareHash: (password, dbpassword) => {
    return bcrypt.compareSync(password, dbpassword);
  },
};
