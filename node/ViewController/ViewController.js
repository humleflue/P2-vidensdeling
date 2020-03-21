/* eslint no-console: off */
const path = require(`path`);

const { Expert } = require(`../Expert/Expert.js`);

class ViewController {
  constructor(req) {
    this.name = `ViewController`;
    this.ejs = {};
    this.validated = false;
    this.root = __dirname.slice(0, -(`node/${this.name}`.length));
    this.request = req;
  }


  template(req, res) {
    this.ejs = path.join(`${this.root}/www/ejs/template.ejs`);
    res.render(this.ejs);
  }

  homePage(req, res) {
    this.ejs = path.join(`${this.root}/www/ejs/home.ejs`);
    res.render(this.ejs);
  }

  aboutPage(req, res) {
    this.html = `This OTHER Post <a href="/form">Go to form</a>`;
    res.send(`Reading about with ${this.html}`);
  }

  businessLogicPage(req, res) {
    const Master = new Expert(req);
    this.html = `<p>På denne side vil du gerne vide et tilfældigt navn som er ${Master.firstname}</p>`;
    res.send(this.html);
  }

  testPage(req, res) {
    this.html = `Jeg er frustreret`;
    res.send(`Hello World`);
  }

  loginPage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/login.ejs`);
    res.render(this.ejs);
  }

  evalueringerPage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/evalueringer.ejs`);
    res.render(this.ejs);
  }

  evalueringerTypePage(req, res){
    if (req.params.type === `flashcard`){
      this.ejs = path.join(`${this.root}/www/views/evalueringerFlashcard.ejs`);
      res.render(this.ejs);
    }
    else if (req.params.type === `quiz`){
      this.ejs = path.join(`${this.root}/www/views/evalueringerQuiz.ejs`);
      res.render(this.ejs);
    }
  }

  rapportPage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/rapport.ejs`);
    res.render(this.ejs);
  }

  rapportAfsnitPage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/rapportafsnit.ejs`);
    let sectionDatabase = {
      2.1:   {keywords: ['vidensdeling', 'feed-up', 'feed-forward'].toString()},
      2.2:   {keywords: ['studier', 'evaluering', 'formativ', 'summativ']},
      2.3:   {keywords: ['metoder', 'active recall', 'spaced repetition']},
      2.4:   {keywords: ['SOTA', 'classkick', 'kahoot!']}
  };
    res.render(this.ejs, {section: req.params.afsnit, content: sectionDatabase});
  }
}


module.exports = {
  ViewController,
};