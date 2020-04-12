const { Database } = require(`./AbstractClasses/Database.js`);

class Quiz extends Database {
  constructor(req) {
    super();
    this.elementtype = `quiz`;
    this.table = `quiz`;
    // Session
    this.groupId = (typeof req.session.groupId  !== `undefined` ? req.session.groupId  : undefined);
    // ID
    this.idColumnName = `idquiz`;
    this.queryId = (typeof req.params.queryId       !== `undefined` ? req.session.queryId      : undefined);
    // Columns
  }
}
module.exports = {
  Quiz,
};
