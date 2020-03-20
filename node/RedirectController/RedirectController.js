const path = require(`path`);

const { User } = require(`../User/User.js`);

class RedirectController {
    constructor(req) {
      this.name = `RedirectController`;
      this.root = __dirname.slice(0, -(`node/${this.name}`.length));
    }

    databaseDown(req,res) {
        this.ejs = path.join(`${this.root}/www/ejs/database_down.ejs`);
        res.render(this.ejs);
    }

    async authentication(req, res) {
        const currentUser = new User(req);
        this.data = await currentUser.loginValid();
        if (this.data.fatal) {
          res.redirect(`/dbdown`);
        }
        else if (this.data.length > 0) {
          res.redirect(`/`);
        }
        else {
          // Indsæt besked til bruger på en eller anden måde. Evt ikke smid personen direkte til register, men giv muligheden for det?
          res.redirect(`/register`);
        }
    }
}

module.exports = {
    RedirectController,
};
