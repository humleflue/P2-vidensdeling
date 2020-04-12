const { Database } = require(`../Database/Database.js`);

/* UNDER CONSTRUCTION */

class Keyword extends Database {
  constructor(req) {
    super();
    this.elementtype = `keyword`;
    this.table = `document_keyword`;
    // Session
    this.groupId         = (typeof req.session.groupId  !== `undefined` ? req.session.groupId  : undefined);
    this.userId  = (typeof req.session.userId    !== `undefined` ? req.session.userId     : undefined);
    // ID
    this.idColumnName = `idkeyword`;
    this.queryId      = (typeof req.params.queryId !== `undefined` ? req.params.queryId : undefined);
    // Columns
  }
}
module.exports = {
  Keyword,
};
