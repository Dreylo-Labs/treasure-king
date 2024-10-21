const unirest = require('unirest');
const { gEnv } = require('../utils/env');
const AppError = require('../utils/app-error');

class Fast2SmsService {
  async sendSMS(phone, message) {
    const fast2smsUrl = gEnv('FAST_SMS_URL');

    const requ = unirest('POST', fast2smsUrl);

    requ.headers({
      authorization: gEnv('API_KEY'),
    });

    requ.form({
      variables_values: message,
      route: 'otp',
      numbers: phone,
    });

    requ.end(function (response) {
      if (response.error) {
        throw new AppError('Error occurred while sending OTP.', 402);
      }
    });
  }
}

module.exports = new Fast2SmsService()
