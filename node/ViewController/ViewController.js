/* eslint no-console: off */
const path = require(`path`);

const { User } = require(`../User/User.js`);
const { Document } = require(`../Document/Document.js`);

class ViewController {
  constructor(req) {
    this.name = `ViewController`;
    this.ejs = {};
    this.validated = false;
    this.root = __dirname.slice(0, -(`node/${this.name}`.length));
    this.request = req;
  }

  homePage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/home.ejs`);
    res.render(this.ejs);
  }

  registerPage(req, res) {
    const Registered = new User(req);
    if (Registered.alreadyLoggedIn()) {
      res.redirect(`/`);
    }
    else {
      this.ejs = path.join(`${this.root}/www/views/register.ejs`);
      res.render(this.ejs);
    }
  }

  loginPage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/login.ejs`);
    res.render(this.ejs);
  }

  evalueringerPage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/evalueringer.ejs`);
    res.render(this.ejs);
  }

  evalueringerTypePage(req, res) {
    if (req.params.type === `flashcard`) {
      this.ejs = path.join(`${this.root}/www/views/evalueringerFlashcard.ejs`);
      res.render(this.ejs);
    }
    else if (req.params.type === `quiz`) {
      this.ejs = path.join(`${this.root}/www/views/evalueringerQuiz.ejs`);
      res.render(this.ejs);
    }
  }

  elementList(req, res) {
    this.ejs = path.join(`${this.root}/www/views/elementList.ejs`);
    res.render(this.ejs);
  }

  rapportPage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/rapport.ejs`);
    res.render(this.ejs);
  }

  async rapportPage2(req, res) {
    const doc = new Document(req);
    const data = await doc.getAllSections();
    console.log(data);
    this.ejs = path.join(`${this.root}/www/views/rapport.ejs`);
    // renderElementList(this.ejs,data," ");
    let besked = "<div>sdjsfhfsdh</div>"
    // this.ejs = this.insertSections(this.ejs,data);
    const besked = { title: `hej Jacob` };
    res.render(this.ejs, { hej: besked.title });
  }

  rapportSectionPage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/rapportafsnit.ejs`);
    const sectionDatabase = {
      2.1: { keywords: [`vidensdeling`, `feed-up`, `feed-forward`].toString() },
      2.2: { keywords: [`studier`, `evaluering`, `formativ`, `summativ`].toString() },
      2.3: { keywords: [`metoder`, `active recall`, `spaced repetition`].toString() },
      2.4: { keywords: [`SOTA`, `classkick`, `kahoot!`].toString() },
    };


    res.render(this.ejs, { section: req.params.afsnit, content: sectionDatabase });
  }
}



function renderElementList(thisDocument,elementList, tag) {	
	// let buttonlist = [];
  thisDocument.document.getElementById(`deck`).innerHTML = ``;
  // for (let i = 0; i < elementList.length; i++) {
	// elementList[i].buttons = createCardButtons(elementList[i])
  
  const card = thisDocument.document.createElement(`div`);
  const value = thisDocument.document.createElement(`div`);
  const elementType = thisDocument.document.createElement(`div`);
	const content = thisDocument.document.createElement(`div`);
	// let buttons = thisDocument.document.createElement(`div`);
	// for (button in elementList[i].buttons) {
    
  // }
	// 	buttons.createElement(`div`).innerHTML = button.title;
		
	// };
    

  card.className = `card`;
  value.className = `value`;
  content.className = `content${elementList[i].ElementType}`;
	elementType.className = `elementType${elementList[i].ElementType}`;
	// buttons.className = `${elementList[i].ElementType}buttons`
	

    // card.classList.add("card")

  elementType.innerHTML = elementList[i].ElementType;
  value.innerHTML = elementList[i].Value;
	content.innerHTML = elementList[i].Content;
	// if (elementList[i].buttons[0] != null){
	// 	buttons.innerHTML = elementList[i].buttons[0]
	// }
	

  card.appendChild(elementType);
  card.appendChild(value);
	card.appendChild(content);
	// card.appendChild(buttons);

    thisDocument.getElementById(`deck`).appendChild(card);
  }


module.exports = {
  ViewController,
};
