/* eslint no-console: off */

const { Database } = require(`./AbstractClasses/Database`);

/* UNDER CONSTRUCTION */

class Group extends Database {
  constructor(req) {
    super();
    this.elementtype = `group`;
    this.table = `group`;
    // Session
    this.groupId = (typeof req.session.groupId        !== `undefined` ? req.session.groupId       : undefined);
    this.userId  = (typeof req.session.userId         !== `undefined` ? req.session.userId        : undefined);
    // ID
    this.idColumnName = `iduser_group`;
    this.queryId = (typeof req.params.groupId         !== `undefined` ? req.params.groupId        : undefined);
    // Columns
    this.name = (typeof req.body.name !== `undefined` ? req.body.name : undefined);
  }
}

module.exports = {
  Group,
};
