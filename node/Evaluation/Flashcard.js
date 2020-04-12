const { Evaluation } = require(`../Evaluation/Evaluation.js`);

/* UNDER CONSTRUCTION */

class Flashcard extends Evaluation {
  /* Input : requestet der sendes fra en klient, samt inheritance af Database objektet.
   * Output: Et objekt med unikt ID konstrueret med de givne variable tilknyttet det.
   * Variablene over mellemrummet inheriter og overskriver JS database modulet.
   * Elementtype er en kolonne i databasen der angiver type, mens table angiver tabellen.
   * Variablene under mellemrummet har navn efter tabelens SQL database kolonner.
   * groupId variablen hentes fra cookies, da de altid skal være tilgængelige.
   * Værdier sat til null er de parent ID'er som objektet har i sig, der endnu ikke har en funktion.
   * idFlashcard variablen hentes fra parametrene, da den sendes med en GET/SELECT request
   * Andre variable hentes fra body, da de sendes med en POST/INSERT eller PUT/UPDATE request
   */
  constructor(req) {
    super();
    this.elementtype = `flashcard`;
    this.table = `flashcard`;
    // ID
    this.idColumnName = `flashcard`;
    this.queryId = (typeof req.params.idFlashcard       !== `undefined` ? req.session.idFlashcard      : undefined);
    // Parents
    this.groupId = (typeof req.session.groupId  !== `undefined` ? req.session.groupId  : undefined);
    this.userId = null;
    this.documentId = null;
    this.sectionId = null;
    this.flashcardId = this.queryId;
    // Columns
    this.concept    = (typeof req.body.concept    !== `undefined` ? req.body.concept    : undefined);
    this.definition = (typeof req.body.definition !== `undefined` ? req.body.definition : undefined);
  }
}
module.exports = {
  Flashcard,
};
