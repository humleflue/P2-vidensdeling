const { Server } = require(`./node/Server.js`);

const devSettings = {
  name: `Developmentserver`,
  port: 3000,
  debug: true, // Denne værdi er UNDER CONSTRUCTION
};
/*
const stageSettings = {
  name: `Staginserver`,
  port: 3000,
  debug: false,
}
*/
/*
const prodSettings = {
  name: `Productionserver`,
  port: 3000,
  debug: false,
}
*/
const Dev = new Server(devSettings);

Dev.startServer();

/* DOKUMENTATIONS NOTER */
/* Alle parameterløse metodekald tilhører objektet selv.
 * Metoder der kræver parametre er dermed noget der tilhører et overobjekt.
 * Muligheden for at slå fra "development mode" til "production" kunne sættes op fra Server klassen
 *
 *
 */
