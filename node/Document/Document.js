/* eslint no-console: off */

const { Database } = require(`../Database/Database.js`);
// Children
const { Section } = require(`../Section/Section`);
const { Keyword } = require(`../Section/Keyword`);

class Document extends Database {
  /* UNDER CONSTRUCTION: Dette er en prøve!!!
   */
  constructor(req) {
    super();
    this.elementtype = `document`;
    this.table       = `document`;
    // ID
    this.idColumnName = `iddocument`;
    this.queryId      = (typeof req.params.queryId !== `undefined` ? req.session.queryId : undefined);
    // Parents
    this.groupId = (typeof req.session.groupId   !== `undefined` ? req.session.groupId    : undefined);
    this.userId  = null;
    this.documentId = this.queryId;
    // Columns
    this.title   = (typeof req.body.title      !== `undefined` ? req.body.title      : undefined);
  }
}


module.exports = {
  Document,
};
