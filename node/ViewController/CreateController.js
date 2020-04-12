/* eslint-disable guard-for-in */
/* eslint no-console: off */
const { User } = require(`../User/User`);
const { Group } = require(`../Group/Group`);

/* UNDER CONSTRUCTION */

class CreateController {
  /* UNDER CONSTRUCTION */
  constructor() {
    this.name = `CreateController`;
    this.root = __dirname.slice(0, -(`node/${this.name}`.length));
  }

  /* UNDER CONSTRUCTION */
  async createGroup(req, res) {
    const G = new Group(req);
    try {
      await G.save();
      res.redirect(`/groups`);
    }
    catch (error) {
      res.redirect(`/dbdown`);
    }
  }

  /* UNDER CONSTRUCTION */
  async createUser(req, res) {
    const U = new User(req);
    try {
      await U.save();
      res.redirect(`/login`);
    }
    catch (error) {
      res.redirect(`/dbdown`);
    }
  }
}

module.exports = {
  CreateController,
};
