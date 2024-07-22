class Result {

  constructor({
    msg,
    msgCode,
    code,
  }) {
    this.msg = msg;
    this.msgCode = msgCode;
    this.code = code;
  }

  static transformRequestOnMsg(req) {
    return `${req.method} ${req?.originalUrl}`;
  }
}

class SuccessResult extends Result {
  constructor({
    msg,
    msgCode,
    code,
    data,
  }) {
    super({ msg, msgCode: msgCode || 'success', code: code || 200 });
    this.data = data;
  }

  handle(res) {
    return res.status(this.code).send(this);
  }
}

class FailureResult extends Result {
  constructor({
    msg,
    msgCode,
    code,
  }) {
    super({ msg, msgCode: msgCode || 'failure', code: code || 500 });
  }

  handle(res) {
    return res.status(this.code).send(this);
  }
}

module.exports = {
  Result,
  SuccessResult,
  FailureResult,
};