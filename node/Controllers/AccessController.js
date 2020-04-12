/* eslint-disable guard-for-in */
/* eslint no-console: off */
const path = require(`path`);
const { User } = require(`../Models/User`);

/* UNDER CONSTRUCTION */

class AccessController {
  /* UNDER CONSTRUCTION */
  constructor() {
    this.name = `ViewController`;
    this.root = __dirname.slice(0, -(`node/Controllers`.length));
    this.ejs = ``;
  }

  /* UNDER CONSTRUCTION */
  groupsPage(req, res) {
    const U = new User(req);
    const data = {
      group: U.getAll(`group`),
    };
    this.ejs = path.join(`${this.root}/www/views/groups.ejs`);
    res.render(this.ejs, { data });
  }

  /* UNDER CONSTRUCTION */
  registerPage(req, res) {
    const Registered = new User(req);
    if (Registered.alreadyLoggedIn()) {
      res.redirect(`/`);
    }
    else {
      this.ejs = path.join(`${this.root}/www/views/register.ejs`);
      res.render(this.ejs);
    }
  }

  /* UNDER CONSTRUCTION */
  loginPage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/login.ejs`);
    res.render(this.ejs);
  }
}

module.exports = {
  AccessController,
};
