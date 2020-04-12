/* eslint-disable guard-for-in */
/* eslint no-console: off */
const { User } = require(`../Models/User`);

/* UNDER CONSTRUCTION */

class SessionController {
  constructor() {
    this.name = `ViewController`;
    this.root = __dirname.slice(0, -(`node/Controllers`.length));
  }

  async userSession(req, res) {
    const currentUser = new User(req);
    const data = await currentUser.loginValid();
    if (this.data.fatal) {
      res.redirect(`/dbdown`);
    }
    else if (this.data.length > 0) {
      console.log(data);
      req.session.userId = 1;
      req.session.loggedin = true;
      req.session.key = this.data[0].username;
      res.redirect(`/`);
    }
    else {
      res.redirect(`/register`);
    }
  }

  async groupSession(req, res) {
    const currentUser = new User(req);
    this.data = await currentUser.loginValid();
    if (this.data.fatal) {
      res.redirect(`/dbdown`);
    }
    else if (this.data.length > 0) {
      req.session.userId = currentUser.getThis(``);
      req.session.loggedin = true;
      req.session.key = this.data[0].username;
      res.redirect(`/`);
    }
    else {
      res.redirect(`/register`);
    }
  }
}

module.exports = {
  SessionController,
};
