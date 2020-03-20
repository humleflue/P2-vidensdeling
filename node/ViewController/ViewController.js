const path = require(`path`);

const { Expert } = require(`../Expert/Expert.js`);

class ViewController {
  constructor(request) {
    this.name = `ViewController`;
    this.root = __dirname.slice(0, -(`node/ViewController`.length));
  }

  homePage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/home.ejs`);
    res.render(this.ejs);
  }

  businessLogicPage(req, res) {
    const Master = new Expert(req);
    this.html = `<p>På denne side vil du gerne vide et tilfældigt navn som er ${Master.firstname}</p>`;
    res.send(this.html);
  }

  registerPage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/register_form.ejs`);
    res.render(this.ejs);
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
    let afsnitMap = new Map();
    afsnitMap.set(2.1, ['vidensdeling', 'feed-up', 'feed-forward'].toString());
    afsnitMap.set(2.2, ['studier', 'evaluering', 'formativ', 'summativ'].toString());
    afsnitMap.set(2.3, ['metoder', 'active recall', 'spaced repetition'].toString());
    afsnitMap.set(2.4, ['SOTA', 'classkick', 'kahoot!'].toString());
    
    res.render(this.ejs, {section: req.params.afsnit, content: afsnitMap});
  }
}


module.exports = {
  ViewController,
};