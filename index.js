const MailBounceSnoop = require('./mail-bounce-snoop').MailBounceSnoop;
const Email = require('./email');

function detectCb(email, detail, cb) {
  let bounceHandler = new MailBounceSnoop();
  let result = bounceHandler.parse_email(email, detail);

  cb(result)
}

function detectPromise(email, detail) {
  return new Promise((resolve, reject) => {
    try {
      detectCb(email, detail, resolve);
    } catch (e) {
      reject(e)
    }
  });
}

function isBounce(result) {
  return result.is === 'bounce'
}

module.exports = {
  email: null,

  init: function (mail) {
    this.email = new Email(mail)
  },

  isBounced: function (cb) {
    if (typeof cb === "undefined") {
      return detectPromise(this.email, false).then(result => {
        return isBounce(result)
      });
    }

    detectCb(this.email, false, (result) => {
      cb(isBounce(result))
    })
  },

  isBouncedEmail: function (email, cb) {
    this.init(email);

    return this.isBounced(cb);
  },

  getBouncedDetail: function (cb) {
    if (typeof cb === "undefined") {
      return detectPromise(this.email, true).then(result => {
        return result
      });
    }

    detectCb(this.email, true, (result) => {
      cb(result)
    })
  },

  getBouncedEmailDetail: function (email, cb) {
    this.init(email);

    return this.getBouncedDetail(cb);
  },
};
