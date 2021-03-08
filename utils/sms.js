const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
} = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = {
  SendingSMS: async (message, hp) => {
    client.messages
      .create({
        body: message,
        from: TWILIO_PHONE_NUMBER,
        to: `+82${hp}`,
      })
      .then()
      .catch((err) => {
        console.log('twilio' + err);
      });
  },

  Sending_AuthSMS: async (hp) => {
    let authcode = Math.random().toString().substr(2, 6);

    let msg = `채팅웹에서 보낸 인증번호는 ${authcode} 입니다.`;

    client.messages
      .create({
        body: msg,
        from: TWILIO_PHONE_NUMBER,
        to: `+82${hp}`,
      })
      .then()
      .catch((err) => {
        console.log('twilio' + err);
      });
    return authcode;
  },
};
