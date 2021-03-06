// const path = require(`path`);
// const { Document } = require(`../Document/Document`);
// const { Section } = require(`../Section/Section`);
// const { Quiz } = require(`../Evaluation/Quiz`);
// const { Flashcard } = require(`../Evaluation/Flashcard`);
const { Group } = require(`../Models/Group`);
// const { User } = require(`../User/User`);

/* Formål: TestControlleren kan bruges til at lave nogle prototyper på serveren, inden de implementeres formelt.
 * Input:  Modtager en settingsfil, indeholder serverinstillingerne bestemt i filen serverSettings.js i roden
 */
class TestController {
  constructor(settings) {
    this.name = `TestController`;
    this.root = settings.root;
    this.ejs = ``;
  }

  async test(req, res) {
    req.session.groupId = `34701dd1-7c29-11ea-86e2-2c4d54532c7a`;
    const G = new Group(req);
    const data = {
      document: await G.getAll(`document`),
    };
    res.send(`Yes its a test! the documents are ${data}`);
  }

  async test2(req, res) {
    res.send(`Something`);
  }

  async test3(req, res) {
    const test1 = (typeof req.params.queryId       !== `undefined` ? req.params.queryId      : undefined);
    res.send(test1);
  }

  async whatever(req, res) {
    res.redirect(204, `/dbdown`);
  }
}

module.exports = {
  TestController,
};
