/* eslint-disable guard-for-in */
/* eslint no-console: off */
const path = require(`path`);
const { Group } = require(`../Models/Group`);
const { User } = require(`../Models/User`);
const { Document } = require(`../Models/Document`);
const { Section } = require(`../Models/Section`);
const { Quiz } = require(`../Models/Quiz`);
const { Flashcard } = require(`../Models/Flashcard`);
const { Keyword } = require(`../Models/Keyword`);

/* ViewController er den controller som præsentere alle de "views" som brugeren kan se i et grupperum.
 * ViewControllerens metoder vil dermed alle sammen hente og vise et ejs dokument, hvor der medsendes data.
 * ViewController vil dermed være den simpleste form, da der ikke bør være nogen form for logik, men alt andet logik bør
 * henvises til eksempelvis RedirectController (hvis der skal tjekkes for redirects) mv.
 */

class ViewController {
  constructor() {
    this.name = `ViewController`;
    this.root = __dirname.slice(0, -(`node/Controllers`.length));
    this.ejs = ``;
  }

  /* Formål: Et overblik til brugeren om den gruppe vedkommende er en del af, samt hvilke muligheder brugeren har.
   * Input : Et request der har oprettet en userId og groupId.
   * Output: Startsiden af hjemmesiden, som skal give et overblik for User.
   */
  async homePage(req, res) {
    const Recipient = new User(req);
    const data = {
      group: await Recipient.getThisGroupData(),
      user: await Recipient.getThisUserData(),
    };
    this.ejs = path.join(`${this.root}/www/views/home.ejs`);
    res.render(this.ejs, { data });
  }

  /* Document Views TODO: */

  // TODO: Mangler EJS fil
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med groupId
   * Output: En liste af de dokumenter som er lagt op i gruppen.
   */
  async viewDocumentRecipientPage(req, res) {
    const Recipient = new Group(req);
    const data = {
      group: await Recipient.getThisGroupData(),
      user: await Recipient.getThisUserData(),
      documents: await Recipient.getAllElementsOfType(`Document`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewDocumentRecipient.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS fil
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId
   * Output: En liste af dokumenter som brugeren har lagt op.
   */
  async viewDocumentExpertPage(req, res) {
    const Expert = new User(req);
    const data = {
      group: await Expert.getThisGroupData(),
      user: await Expert.getThisUserData(),
      documents: await Expert.getAllElementsOfType(`Document`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewDocumentExpert.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS fil
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId
   * Output: En visning af en form som brugeren kan bruge til at oprette et dokument.
   */
  async insertDocumentPage(req, res) {
    const Expert = new User(req);
    const data = {
      group: await Expert.getThisGroupData(),
      user: await Expert.getThisUserData(),
    };
    this.ejs = path.join(`${this.root}/www/views/insertDocument.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS fil
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : Et request med et queryId samt en session med userId og groupId
   * Output: Visning af et dokument
   */
  async viewDocumentPage(req, res) {
    const Doc = new Document(req);
    const data = {
      group: await Doc.getThisGroupData(),
      user: await Doc.getThisUserData(),
      document: await Doc.getThis(),
    };
    this.ejs = path.join(`${this.root}/www/views/viewDocument.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS fil
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : Et request med et queryId samt en session med userId og groupId
   * Output: Ens dokument data med mulighed for at rette i det.
   */
  async updateDocumentPage(req, res) {
    const Doc = new Document(req);
    const data = {
      group: await Doc.getThisGroupData(),
      user: await Doc.getThisUserData(),
      document: await Doc.getThis(),
    };
    this.ejs = path.join(`${this.root}/www/views/updateDocument.ejs`);
    res.render(this.ejs, { data });
  }

  /* Section Views TODO: */

  // TODO: Mangler EJS fil
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId
   * Output: En liste af de sections som er lagt op i gruppen.
   */
  async viewSectionRecipientPage(req, res) {
    const Recipient = new Group(req);

    const data = {
      group: await Recipient.getThisGroupData(),
      user: await Recipient.getThisUserData(),
      sections: await Recipient.getAllElementsOfType(`Section`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewSectionRecipient.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS fil
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId
   * Output: En liste af de sections som brugeren har oprettet
   */
  async viewSectionExpertPage(req, res) {
    const Expert = new User(req);
    const data = {
      group: await Expert.getThisGroupData(),
      user: await Expert.getThisUserData(),
      sections: await Expert.getAllElementsOfType(`Section`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewSectionExpert.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId samt et queryId fra params
   * Output: En liste af de sections som tilhører et specifikt dokument
   */
  async viewSectionDocumentPage(req, res) {
    const Doc = new Document(req);
    const data = {
      group: await Doc.getThisGroupData(),
      user: await Doc.getThisUserData(),
      sections: await Doc.getAllElementsOfType(`Section`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewSectionDocument.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId
   * Output: En visning af en form hvor brugeren kan tilføje en section
   * FIXME: Denne funktion skal gerne, på en eller anden måde, kunne vurdere om der er valgt et dokument/section på forhånd
   *        som denne insert skal knyttes til.
   *        Det er vigtigt, at strukturen for hvordan det løses på, er den samme for alle de andre URL'er.
   */
  async insertSectionPage(req, res) {
    const Expert = new User(req);
    const data = {
      group: await Expert.getThisGroupData(),
      user: await Expert.getThisUserData(),
    };
    this.ejs = path.join(`${this.root}/www/views/insertSection.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : Et request med et queryId samt en session med userId og groupId
   * Output: En visning af en enkelt section til brugeren
   */
  async viewSectionPage(req, res) {
    const Sec = new Section(req);
    const data = {
      group: await Sec.getThisGroupData(),
      user: await Sec.getThisUserData(),
      document: await Sec.getThis(),
    };
    this.ejs = path.join(`${this.root}/www/views/viewSection.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : Et request med et queryId samt en session med userId og groupId
   * Output: En præsentation af en section i en form som kan ændres
   */
  async updateSectionPage(req, res) {
    const Sec = new Section(req);
    const data = {
      group: await Sec.getThisGroupData(),
      user: await Sec.getThisUserData(),
      document: await Sec.getThis(),
    };
    this.ejs = path.join(`${this.root}/www/views/updateSection.ejs`);
    res.render(this.ejs, { data });
  }

  /* Evaluation Views TODO: */

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId
   * Output: En liste med alle de oprettede evalueringsværktøjer som er i gruppen
   */
  async viewEvaluationsRecipientPage(req, res) {
    const Recipient = new Group(req);
    const data = {
      group: await Recipient.getThisGroupData(),
      user: await Recipient.getThisUserData(),
      quizzes: await Recipient.getAllElementsOfType(`Quiz`),
      flashcards: await Recipient.getAllElementsOfType(`Flashcard`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewEvaluationsRecipient.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId
   * Output: En liste med alle de oprettede evalueringsværktøjer som en bruger har oprettet.
   */
  async viewEvaluationsExpertPage(req, res) {
    const Expert = new User(req);
    const data = {
      group: await Expert.getThisGroupData(),
      user: await Expert.getThisUserData(),
      quizzes: await Expert.getAllElementsOfType(`Quiz`),
      flashcards: await Expert.getAllElementsOfType(`Flashcard`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewEvaluationsExpert.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId og queryId fra params
   * Output: En liste af alle de quiz/flashcard/mm. der er tilknyttet et dokument
   */
  async viewEvaluationsDocumentPage(req, res) {
    const Doc = new Document(req);
    const data = {
      group: await Doc.getThisGroupData(),
      user: await Doc.getThisUserData(),
      document: await Doc.getThis(),
      quizzes: await Doc.getAllElementsOfType(`Quiz`),
      flashcards: await Doc.getAllElementsOfType(`Flashcard`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewEvaluationsDocument.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId og queryId fra params
   * Output: En liste med alle de evalueringer der er tilknyttet en section
   */
  async viewEvaluationsSectionPage(req, res) {
    const Sec = new Section(req);
    const data = {
      group: await Sec.getThisGroupData(),
      user: await Sec.getThisUserData(),
      document: await Sec.getThis(),
      quizzes: await Sec.getAllElementsOfType(`Quiz`),
      flashcards: await Sec.getAllElementsOfType(`Flashcard`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewEvaluationsSection.ejs`);
    res.render(this.ejs, { data });
  }

  /* Quiz Views TODO: */

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId
   * Output: En liste af alle de quiz som er tilgængelige for en bruger
   */
  async viewQuizRecipientPage(req, res) {
    const Recipient = new Group(req);
    const data = {
      group: await Recipient.getThisGroupData(),
      user: await Recipient.getThisUserData(),
      quizzes: await Recipient.getAllElementsOfType(`Quiz`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewQuizRecipient.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId
   * Output: En liste af alle de quiz som en User har oprettet
   */
  async viewQuizExpertPage(req, res) {
    const Expert = new User(req);
    const data = {
      group: await Expert.getThisGroupData(),
      user: await Expert.getThisUserData(),
      quizzes: await Expert.getAllElementsOfType(`Quiz`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewQuizExpert.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId og queryId fra params
   * Output: En liste af alle de quiz som er tilknyttet dokumentet
   */
  async viewQuizDocumentPage(req, res) {
    const Doc = new Document(req);
    const data = {
      group: await Doc.getThisGroupData(),
      user: await Doc.getThisUserData(),
      document: await Doc.getThis(),
      quizzes: await Doc.getAllElementsOfType(`Quiz`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewDocument.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId og queryId fra params
   * Output: En liste med quiz tilhørende en section
   */
  async viewQuizSectionPage(req, res) {
    const Sec = new Section(req);
    const data = {
      group: await Sec.getThisGroupData(),
      user: await Sec.getThisUserData(),
      section: await Sec.getThis(),
      quizzes: await Sec.getAllElementsOfType(`Quiz`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewQuizSection.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId (og muligvis document/section id?)
   * Output: En præsentation af den form der gør det muligt at oprette en Quiz
   * FIXME: Denne funktion skal gerne, på en eller anden måde, kunne vurdere om der er valgt et dokument/section på forhånd
   *        som denne insert skal knyttes til.
   *        Det er vigtigt, at strukturen for hvordan det løses på, er den samme for alle de andre URL'er.
   */
  async insertQuizPage(req, res) {
    const Expert = new User(req);
    const data = {
      group: await Expert.getThisGroupData(),
      user: await Expert.getThisUserData(),
    };
    this.ejs = path.join(`${this.root}/www/views/insertQuiz.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : Et request med et queryId samt en session med userId og groupId
   * Output: En fremvisning af en quiz og dens tilhørende spørgsmål/svar så en bruger kan tage den
   */
  async viewQuizPage(req, res) {
    const Q = new Quiz(req);
    const data = {
      group: await Q.getThisGroupData(),
      user: await Q.getThisUserData(),
      quiz: await Q.getThis(),
      questions: await Q.getAllElementsOfType(`QuizQuestion`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewQuiz.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : Et request med et queryId samt en session med userId og groupId
   * Output: En fremvisning af en quiz og dens tilhørende spørgsmål/svar så en bruger kan rette den til
   */
  async updateQuizPage(req, res) {
    const Q = new Quiz(req);
    const data = {
      group: await Q.getThisGroupData(),
      user: await Q.getThisUserData(),
      quiz: await Q.getThis(),
      questions: await Q.getAllElementsOfType(`QuizQuestion`),
    };
    this.ejs = path.join(`${this.root}/www/views/updateQuiz.ejs`);
    res.render(this.ejs, { data });
  }

  /* Flashcard Views TODO: */

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId
   * Output: En liste af flashcards som en bruger kan tage
   */
  async viewFlashcardRecipientPage(req, res) {
    const Recipient = new Group(req);
    const data = {
      group: await Recipient.getThisGroupData(),
      user: await Recipient.getThisUserData(),
      flashcards: await Recipient.getAllElementsOfType(`Flashcard`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewFlashcardRecipient.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId
   * Output: En liste af flashcards som er tilknyttet brugeren
   */
  async viewFlashcardExpertPage(req, res) {
    const Expert = new User(req);
    const data = {
      group: await Expert.getThisGroupData(),
      user: await Expert.getThisUserData(),
      flashcards: await Expert.getAllElementsOfType(`Flashcard`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewFlashcardExpert.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId
   * Output: En liste af flashcards der findes i et bestemt dokument
   */
  async viewFlashcardDocumentPage(req, res) {
    const Doc = new Document(req);
    const data = {
      group: await Doc.getThisGroupData(),
      user: await Doc.getThisUserData(),
      document: await Doc.getThis(),
      flashcards: await Doc.getAllElementsOfType(`Flashcard`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewFlashcardDocument.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId
   * Output: En liste af flashcards tilhørende en section
   */
  async viewFlashcardSectionPage(req, res) {
    const Sec = new Section(req);
    const data = {
      group: await Sec.getThisGroupData(),
      user: await Sec.getThisUserData(),
      section: await Sec.getThis(),
      flashcards: await Sec.getAllElementsOfType(`Flashcard`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewFlashcardSection.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId (og muligvis document/section id?)
   * Output: En form som gør det muligt for brugeren at POST et flashcard
   * FIXME: Denne funktion skal gerne, på en eller anden måde, kunne vurdere om der er valgt et dokument/section på forhånd
   *        som denne insert skal knyttes til.
   *        Det er vigtigt, at strukturen for hvordan det løses på, er den samme for alle de andre URL'er.
   */
  async insertFlashcardPage(req, res) {
    const Expert = new User(req);
    const data = {
      group: await Expert.getThisGroupData(),
      user: await Expert.getThisUserData(),
    };
    this.ejs = path.join(`${this.root}/www/views/insertFlashcard.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : Et request med et queryId samt en session med userId og groupId
   * Output: Et enkelt flashcard
   */
  async viewFlashcardPage(req, res) {
    const F = new Flashcard(req);
    const data = {
      group: await F.getThisGroupData(),
      user: await F.getThisUserData(),
      flashcard: await F.getThis(),
    };
    this.ejs = path.join(`${this.root}/www/views/viewDocument.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : Et request med et queryId samt en session med userId og groupId
   * Output: En form der gør det muligt opdateret et flashcard
   */
  async updateFlashcardPage(req, res) {
    const F = new Flashcard(req);
    const data = {
      group: await F.getThisGroupData(),
      user: await F.getThisUserData(),
      flashcard: await F.getThis(),
    };
    this.ejs = path.join(`${this.root}/www/views/updateFlashcard.ejs`);
    res.render(this.ejs, { data });
  }

  /* Keyword Views TODO: */

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId
   * Output: En liste af alle keywords som er til stede i Group
   */
  async viewKeywordRecipientPage(req, res) {
    const Recipient = new Group(req);
    const data = {
      group: await Recipient.getThisGroupData(),
      user: await Recipient.getThisUserData(),
      keywords: await Recipient.getAllElementsOfType(`Keyword`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewKeywordRecipient.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId
   * Output: En liste af alle keywords en bruger har oprettet
   */
  async viewKeywordExpertPage(req, res) {
    const Expert = new User(req);
    const data = {
      group: await Expert.getThisGroupData(),
      user: await Expert.getThisUserData(),
      keywords: await Expert.getAllElementsOfType(`Keyword`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewKeywordExpert.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId og queryId fra params
   * Output: En liste med alle de keywords der er i et dokument
   */
  async viewKeywordDocumentPage(req, res) {
    const Doc = new Document(req);
    const data = {
      group: await Doc.getThisGroupData(),
      user: await Doc.getThisUserData(),
      document: await Doc.getThis(),
      keywords: await Doc.getAllElementsOfType(`Keyword`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewKeywordDocument.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId og queryId fra params
   * Output: En liste med alle de keywords forbundet til en section
   */
  async viewKeywordSectionPage(req, res) {
    const Sec = new Section(req);
    const data = {
      group: await Sec.getThisGroupData(),
      user: await Sec.getThisUserData(),
      section: await Sec.getThis(),
      keywords: await Sec.getAllElementsOfType(`Keyword`),
    };
    this.ejs = path.join(`${this.root}/www/views/viewKeywordSection.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : En session med userId og groupId (og muligvis document/section id?)
   * Output: En form hvor det er muligt at rette et keyword til
   * FIXME: Denne funktion skal gerne, på en eller anden måde, kunne vurdere om der er valgt et dokument/section på forhånd
   *        som denne insert skal knyttes til.
   *        Det er vigtigt, at strukturen for hvordan det løses på, er den samme for alle de andre URL'er.
   */
  async insertKeywordPage(req, res) {
    const Expert = new User(req);
    const data = {
      group: await Expert.getThisGroupData(),
      user: await Expert.getThisUserData(),
    };
    this.ejs = path.join(`${this.root}/www/views/insertKeyword.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : Et request med et queryId samt en session med userId og groupId
   * Output: Et keyword
   */
  async viewKeywordPage(req, res) {
    const K = new Keyword(req);
    const data = {
      group: await K.getThisGroupData(),
      user: await K.getThisUserData(),
      document: await K.getThis(),
    };
    this.ejs = path.join(`${this.root}/www/views/viewKeyword.ejs`);
    res.render(this.ejs, { data });
  }

  // TODO: Mangler EJS
  /* Formål: BESKRIV EJS FORMÅL HER
   * Input : Et request med et queryId samt en session med userId og groupId
   * Output: En form der giver brugeren mulighed for at opdatere et keyword
   */
  async updateKeywordPage(req, res) {
    const K = new Keyword(req);
    const data = {
      group: await K.getThisGroupData(),
      user: await K.getThisUserData(),
      keyword: await K.getThis(),
    };
    this.ejs = path.join(`${this.root}/www/views/updateKeyword.ejs`);
    res.render(this.ejs, { data });
  }
}

module.exports = {
  ViewController,
};
