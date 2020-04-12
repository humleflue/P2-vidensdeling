/* eslint no-console: off */

const { Database } = require(`./AbstractClasses/Database`);

/* UNDER CONSTRUCTION */

class Group extends Database {
  constructor(req) {
    super();
    this.elementtype = `group`;
    this.table = `group`;
    // Session
    this.idGroup = (typeof req.session.idGroup        !== `undefined` ? req.session.idGroup       : undefined);
    // ID
    this.idColumnName = `iduser_group`;
    this.queryId = (typeof req.params.idGroup         !== `undefined` ? req.params.idGroup        : undefined);
    // Columns
    this.name = (typeof req.body.name !== `undefined` ? req.body.name : undefined);
  }
}

module.exports = {
  Group,
};
