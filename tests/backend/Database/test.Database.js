/* eslint no-console: off */
const tape = require(`tape`);
const testDecorater = require(`tape-promise`).default;

const test = testDecorater(tape);
const { Database } = require(`../../../node/Models/AbstractClasses/Database.js`);

let actualObject = true;
let actual = true;
let expected = true;
let object = new Database();
/* textoff bruges til at slaa info() teksten fra diverse fejlmeddelser naar de testes */
const textoff = false;

/* Dokumentation */
/*
 * Database objektet stiller alle manipulationer af databasen til raadighed for modeller (dvs. Ikke controllere!)
 * Databasen er designet efter et REST princip, som betyder at databasen skal kunne:
 * get      (dvs. faa allerede gemte data fra databasen)
 * post     (dvs. oprette nye elementer i databasen)
 * put      (dvs. manipulere med data i databasen)
 * delete   (dvs. slette elementer i databasen)
 * head     (dvs. faa information om resourcerne i SQLdatabasen.)
 * options: (dvs. faa information om brugen af databasen og dens resourcer.)
 *
 * KRAVSSPECIFIKATIONER FINDES Paa OVERLEAF!
 * Se under 4_Design/Database.tex nederst paa siden.
 */

/* Denne test gør brug af pregenereret data i MySQL databasen som er:
 *     iddatabase test_option1 test_option2 test_option3 test_option4 test_option5_float
 *     *          test1        test2        test3        null         1
 *     *          test4        test5        test6        null         1.2
 *     *          test7        test8        test9        null         -123
 *
 *    Størstedelen af tests vil foregaa paa test_option1-3,
 *    hvor test_option4 bruges til at teste funktionaliteter paa ikke unikke operationer.
 */
/* Input: Intet, men bruger "object" variablen.
 * Output: Har som sideeffect at gendanne tabellen til sine oprindelige værdier.
 * Formål: Kaldes i slutningen af testen for at gendanne værdierne.
 *         Dette gør at testen er fuldstændig selvstændig i sine tests.
 */
async function resetDB() {
  try {
    await object.query(`CUSTOM`, `DELETE FROM ${object.database}.${object.table}`, textoff);
    await object.query(`CUSTOM`, `INSERT INTO ${object.database}.${object.table} 
             (test_option1, test_option2, test_option3, test_option4, test_option5_float)
              VALUES ("test1", "test2", "test3", NULL, "1")`, textoff);
    await object.query(`CUSTOM`, `INSERT INTO ${object.database}.${object.table} 
              (test_option1, test_option2, test_option3, test_option4, test_option5_float)
               VALUES ("test4", "test5", "test6", NULL, "1.2")`, textoff);
    await object.query(`CUSTOM`, `INSERT INTO ${object.database}.${object.table} 
               (test_option1, test_option2, test_option3, test_option4, test_option5_float)
                VALUES ("test7", "test8", "test9", NULL, "-123")`, textoff);
  }
  catch (err) {
    throw (new Error(`Databasen er IKKE opsat korrekt! Check setupDB i Databasens tests`));
  }
}

test(`Test af Database Klassen i node/Database`, async (assert) => {
  assert.equal(actual, expected, `Skulle gerne være oprettet.`);

  object = new Database();
  /* 1.1 */
  try {
    await object.connect.connect(async (err) => {
      if (err) {
        throw err;
      }
    });
    expected = true;
  }
  catch (err) {
    expected = false;
  }
  assert.true(expected,
    `(1.1) {Altid true hvis der IKKE sker en error} Databasen skal have adgang til SQL databasen.`);

  await resetDB();

  /* 2.1 */
  try {
    expected = `SELECT * FROM ${object.database}.${object.table} WHERE testfield = "test"`;
    actual = object.inputParser(`SELECT *`, `testfield = "test"`);
    assert.equal(actual, expected,
      `(2.1.1) (get) Databasen skal kunne omskrive sit input til en valid SQL streng efter metodevalg`);

    expected = `INSERT INTO ${object.database}.${object.table} (testfield1, testfield2) VALUES ("test1", "test2")`;
    actual = object.inputParser(`INSERT`, `testfield1 = "test1" AND testfield2 = "test2"`);
    assert.equal(actual, expected,
      `(2.1.2) (post) Databasen skal kunne omskrive sit input til en valid SQL streng efter metodevalg`);

    expected = `UPDATE ${object.database}.${object.table} SET testfield1 = "test2" WHERE testfield1 = "test1"`;
    actual = object.inputParser(`UPDATE`, `testfield1 = "test2" WHERE testfield1 = "test1"`);
    assert.equal(actual, expected,
      `(2.1.3) (put) Databasen skal kunne omskrive sit input til en valid SQL streng efter metodevalg`);

    expected = `DELETE FROM ${object.database}.${object.table} WHERE testfield1 = "test1"`;
    actual = object.inputParser(`DELETE`, `testfield1 = "test1"`);
    assert.equal(actual, expected,
      `(2.1.4) (delete) Databasen skal kunne omskrive sit input til en valid SQL streng efter metodevalg`);

    expected = `SELECT * FROM information_schema.columns WHERE table_schema = "${object.database}" AND table_name = "${object.table}"`;
    actual = object.inputParser(`HEAD`);
    assert.equal(actual, expected,
      `(2.1.5) (head) Databasen skal kunne omskrive sit input til en valid SQL streng efter metodevalg`);
  }
  catch (err) {
    assert.false(true,
      `(2.1) Resolvede ikke eller kun delvist med fejlen: ${err}`);
  }

  /* 2.2 */
  try {
    actual = await object.query(`THIS IS NOT A VALID QUERY`, `NO IT IS NOT`, textoff);
    actual = false;
  }
  catch (error) {
    actual = true;
  }
  assert.true(actual,
    `(2.2) Databasen skal give en fejlmeddelse, hvis et input ikke kan omskrives til en valid SQL streng.`);

  /* 3.1 */
  try {
    actualObject = await object.query(`SELECT test_option1`, `test_option1 = "test1"`);

    expected = `test1`;
    actual = actualObject[0].test_option1;
    assert.equal(actual, expected,
      `(3.1) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente 1 specifikt datapunkt fra databasen`);
  }
  catch (err) {
    assert.false(true,
      `(3.1) Fejlede med den givne fejl: ${err}`);
  }

  /* 3.2 */
  try {
    actualObject = await object.query(`SELECT *`, `test_option1 = "test1" AND test_option2 = "test2"`);

    expected = `test1`;
    actual = actualObject[0].test_option1;
    assert.equal(actual, expected,
      `(3.2.1) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente 1 row af data fra database`);

    actual = actualObject[0].test_option2;
    expected = `test2`;
    assert.equal(actual, expected,
      `(3.2.2) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente 1 row af data fra database`);

    actual = actualObject[0].test_option3;
    expected = `test3`;
    assert.equal(actual, expected,
      `(3.2.3) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente 1 row af data fra database`);
  }
  catch (err) {
    assert.false(true,
      `(3.2) Fejlede med den givne fejl: ${err}`);
  }

  /* 3.3 */
  try {
    actualObject = await object.query(`SELECT test_option1`);
    expected = `test1`;
    actual = actualObject[0].test_option1;
    assert.equal(actual, expected,
      `(3.3.1) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente 1 column af data fra databasen`);

    expected = `test4`;
    actual = actualObject[1].test_option1;
    assert.equal(actual, expected,
      `(3.3.2) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente 1 column af data fra databasen`);

    expected = `test7`;
    actual = actualObject[2].test_option1;
    assert.equal(actual, expected,
      `(3.3.3) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente 1 column af data fra databasen`);
  }
  catch (err) {
    assert.false(true,
      `(3.3) Fejlede med den givne fejl: ${err}`);
  }

  /* 3.4 */
  try {
    actualObject = await object.query(`SELECT *`, `test_option1 = "test1" OR test_option1 = "test4"`);

    expected = `test1`;
    actual = actualObject[0].test_option1;
    assert.equal(actual, expected,
      `(3.4.1) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en serie af rows fra databasen`);

    expected = `test2`;
    actual = actualObject[0].test_option2;
    assert.equal(actual, expected,
      `(3.4.2) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en serie af rows fra databasen`);

    expected = `test3`;
    actual = actualObject[0].test_option3;
    assert.equal(actual, expected,
      `(3.4.3) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en serie af rows fra databasen`);

    expected = `test4`;
    actual = actualObject[1].test_option1;
    assert.equal(actual, expected,
      `(3.4.4) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en serie af rows fra databasen`);

    expected = `test5`;
    actual = actualObject[1].test_option2;
    assert.equal(actual, expected,
      `(3.4.5) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en serie af rows fra databasen`);

    expected = `test6`;
    actual = actualObject[1].test_option3;
    assert.equal(actual, expected,
      `(3.4.6) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en serie af rows fra databasen`);
  }
  catch (err) {
    assert.false(true,
      `(3.4) Fejlede med den givne fejl: ${err}`);
  }

  /* 3.5 */
  try {
    actualObject = await object.query(`SELECT test_option1, test_option2`);

    expected = `test1`;
    actual = actualObject[0].test_option1;
    assert.equal(actual, expected,
      `(3.5.1) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en serie af columns fra databasen`);

    expected = `test2`;
    actual = actualObject[0].test_option2;
    assert.equal(actual, expected,
      `(3.5.2) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en serie af columns fra databasen`);

    expected = `test4`;
    actual = actualObject[1].test_option1;
    assert.equal(actual, expected,
      `(3.5.3) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en serie af columns fra databasen`);

    expected = `test5`;
    actual = actualObject[1].test_option2;
    assert.equal(actual, expected,
      `(3.5.4) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en serie af columns fra databasen`);

    expected = `test7`;
    actual = actualObject[2].test_option1;
    assert.equal(actual, expected,
      `(3.5.5) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en serie af columns fra databasen`);

    expected = `test8`;
    actual = actualObject[2].test_option2;
    assert.equal(actual, expected,
      `(3.5.6) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en serie af columns fra databasen`);
  }
  catch (err) {
    assert.false(true,
      `(3.1) Fejlede med den givne fejl: ${err}`);
  }

  /* 3.6 */
  try {
    actualObject = await object.query(`SELECT *`);

    expected = `test1`;
    actual = actualObject[0].test_option1;
    assert.equal(actual, expected,
      `(3.6.1) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en hel tabel fra databasen`);

    expected = `test2`;
    actual = actualObject[0].test_option2;
    assert.equal(actual, expected,
      `(3.6.2) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en hel tabel fra databasen`);

    expected = `test3`;
    actual = actualObject[0].test_option3;
    assert.equal(actual, expected,
      `(3.6.3) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en hel tabel fra databasen`);

    expected = `test4`;
    actual = actualObject[1].test_option1;
    assert.equal(actual, expected,
      `(3.6.4) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en hel tabel fra databasen`);

    expected = `test5`;
    actual = actualObject[1].test_option2;
    assert.equal(actual, expected,
      `(3.6.5) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en hel tabel fra databasen`);

    expected = `test6`;
    actual = actualObject[1].test_option3;
    assert.equal(actual, expected,
      `(3.6.6) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en hel tabel fra databasen`);

    expected = `test7`;
    actual = actualObject[2].test_option1;
    assert.equal(actual, expected,
      `(3.6.7) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en hel tabel fra databasen`);

    expected = `test8`;
    actual = actualObject[2].test_option2;
    assert.equal(actual, expected,
      `(3.6.8) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en hel tabel fra databasen`);

    expected = `test9`;
    actual = actualObject[2].test_option3;
    assert.equal(actual, expected,
      `(3.6.9) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente en hel tabel fra databasen`);
  }
  catch (err) {
    assert.false(true,
      `(3.6) Fejlede med den givne fejl: ${err}`);
  }

  /* 3.7 */
  try {
    actualObject = await object.query(`SELECT test_option5_float`);
  }
  catch (error) {
    console.log(`TEST FORKERT IMPLEMENTERET PGA: ${error}`);
  }

  expected = 1;
  actual = actualObject[0].test_option5_float;
  assert.equal(actual, expected,
    `(3.7.1) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente ints og floats fra databasen.`);

  expected = 1.2;
  actual = actualObject[1].test_option5_float;
  assert.equal(actual, expected,
    `(3.7.2) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente ints og floats fra databasen.`);

  expected = -123;
  actual = actualObject[2].test_option5_float;
  assert.equal(actual, expected,
    `(3.7.3) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne hente ints og floats fra databasen.`);

  /* 4.1  */
  try {
    await object.query(`INSERT`, `test_option1 = "test10" AND test_option2 = "test11" AND test_option3 = "test12" 
                         AND test_option4 = "ikkeNull" AND test_option5_float = 1.42`);
  }
  catch (error) {
    console.log(`TEST FORKERT IMPLEMENTERET PGA: ${error}`);
  }
  try {
    actualObject = await object.query(`SELECT *`, `test_option1 = "test10"`);
  }
  catch (error) {
    console.log(`NEW ERROR ${error}`);
  }

  expected = `test10`;
  actual = actualObject[0].test_option1;
  assert.equal(actual, expected,
    `(4.1.1) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne oprette en ny row i databasen ud fra fuldstændig information`);

  actual = actualObject[0].test_option2;
  expected = `test11`;
  assert.equal(actual, expected,
    `(4.1.2) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne oprette en ny row i databasen ud fra fuldstændig information`);

  actual = actualObject[0].test_option3;
  expected = `test12`;
  assert.equal(actual, expected,
    `(4.1.3) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne oprette en ny row i databasen ud fra fuldstændig information`);

  /* 4.2 */
  try {
    await object.query(`INSERT`, `test_option1 = "test13" AND test_option2 = "test14"`);
  }
  catch (error) {
    console.log(`TEST FORKERT IMPLEMENTERET PGA: ${error}`);
  }

  actualObject = await object.query(`SELECT *`, `test_option1 = "test13"`);

  expected = `test13`;
  actual = actualObject[0].test_option1;
  assert.equal(actual, expected,
    `(4.2.1) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne oprette en ny row i databasen ud fra ufuldstændig information`);

  expected = `test14`;
  actual = actualObject[0].test_option2;
  assert.equal(actual, expected,
    `(4.2.2) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne oprette en ny row i databasen ud fra ufuldstændig information`);

  expected = null;
  actual = actualObject[0].test_option3;
  assert.equal(actual, expected,
    `(4.2.3) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne oprette en ny row i databasen ud fra ufuldstændig information`);

  /* 4.3 */
  try {
    actualObject = await object.query(`INSERT`, `test_option1 = "test1"`, textoff);
    actual = false;
  }
  catch (error) {
    actual = true;
  }
  assert.true(actual,
    `(4.3) Databasen skal kunne give en fejlmeddelse, hvis der gemmes duplikeret data i en unique column`);

  /* 4.4 */
  try {
    actualObject = await object.query(`INSERT`, `test_option1 = "test@test.dk"`, textoff);
    actual = false;
  }
  catch (error) {
    actual = true;
  }
  assert.true(actual,
    `(4.4) Databasen skal kunne gemme emails.`);

  /* 5.1 */
  try {
    await object.query(`UPDATE`, `test_option1 = "test1_modificeret" WHERE test_option1 = "test1"`);
  }
  catch (error) {
    console.log(`TEST FORKERT IMPLEMENTERET PGA: ${error}`);
  }
  actualObject = await object.query(`SELECT test_option1`, `test_option1 = "test1_modificeret"`);

  expected = `test1_modificeret`;
  actual = actualObject[0].test_option1;
  assert.equal(actual, expected,
    `(5.1) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne modificere 1 specifikt datapunkt fra databasen`);

  /* 5.2 */
  try {
    await object.query(`UPDATE`, `test_option1 = "test4_modificeret", test_option2 = "test5_modificeret", test_option3 = "test6_modificeret" 
                        WHERE test_option1 = "test4" AND test_option2 = "test5" AND test_option3 = "test6"`);
  }
  catch (error) {
    console.log(`TEST FORKERT IMPLEMENTERET PGA: ${error}`);
  }
  actualObject = await object.query(`SELECT *`, `test_option1 = "test4_modificeret"`);

  expected = `test4_modificeret`;
  actual = actualObject[0].test_option1;
  assert.equal(actual, expected,
    `(5.2.1) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne modificere 1 row af data fra database`);

  expected = `test5_modificeret`;
  actual = actualObject[0].test_option2;
  assert.equal(actual, expected,
    `(5.2.2) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne modificere 1 row af data fra database`);

  expected = `test6_modificeret`;
  actual = actualObject[0].test_option3;
  assert.equal(actual, expected,
    `(5.2.3) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne modificere 1 row af data fra database`);

  /* 5.3 */
  try {
    await object.inputParser(`UPDATE`, `test_option1 = "Must Not Happen`, textoff);
    actual = false;
  }
  catch (error) {
    actual = true;
  }
  assert.true(actual,
    `(5.3) {Forventet: ${expected} Reel: ${actual}} Databasen skal give en fejlmeddelse, hvis der ønskes at blive opdateret en kolonne med samme værdi`);

  /* 5.4 */
  try {
    await object.query(`UPDATE`, `notATable = "notAValue_mod" WHERE notATable = "notAValue"`, textoff);
    actual = false;
  }
  catch (error) {
    actual = true;
  }
  assert.true(actual,
    `(5.4) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne give en fejlmeddelse, hvis dataene der ønskes opdateret ikke findes`);

  /* 6.1 */
  try {
    await object.query(`DELETE`, `test_option1 = "test10"`);
    expected = true;
    actualObject = await object.query(`SELECT *`, `test_option1 = "test10"`);
    if (actualObject.length > 0) {
      actual = false;
    }
    else {
      actual = true;
    }
    assert.equal(actual, expected,
      `(6.1) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne slette en row i databasen`);
  }
  catch (err) {
    assert.true(false,
      `(6.1) Ikke fejlede med denne fejl: ${err}`);
  }

  try {
    await object.query(`DELETE`, `notATable = "notAValue_mod`, textoff);
    actual = false;
  }
  catch (error) {
    actual = true;
  }
  assert.equal(actual, expected,
    `(6.2) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne give en fejlmeddelse, hvis dataene der ønskes slettet ikke findes`);

  /* 6.3 */
  try {
    await object.inputParser(`DELETE`, ``, textoff);
    actual = false;
  }
  catch (error) {
    actual = true;
  }
  assert.equal(actual, expected,
    `(6.2) {Forventet: ${expected} Reel: ${actual}} Databasen skal ikke kunne slette en hel tabel.`);


  /* 7.1 */
  try {
    actualObject = await object.query(`HEAD`);

    expected = `iddatabase`;
    actual = actualObject[0].COLUMN_NAME;
    assert.equal(actual, expected,
      `(7.1.1) {Forventet: ${expected} Reel: ${actual}} .1 Databasen skal kunne sende data om hvilke column navne den tilkoblede tabel har.`);

    expected = `test_option1`;
    actual = actualObject[1].COLUMN_NAME;
    assert.equal(actual, expected,
      `(7.1.2) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne sende data om hvilke column navne den tilkoblede tabel har.`);

    expected = `test_option2`;
    actual = actualObject[2].COLUMN_NAME;
    assert.equal(actual, expected,
      `(7.1.3) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne sende data om hvilke column navne den tilkoblede tabel har.`);

    expected = `test_option3`;
    actual = actualObject[3].COLUMN_NAME;
    assert.equal(actual, expected,
      `(7.1.4) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne sende data om hvilke column navne den tilkoblede tabel har.`);

    expected = `test_option4`;
    actual = actualObject[4].COLUMN_NAME;
    assert.equal(actual, expected,
      `(7.1.5) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne sende data om hvilke column navne den tilkoblede tabel har.`);

    expected = `test_option5_float`;
    actual = actualObject[5].COLUMN_NAME;
    assert.equal(actual, expected,
      `(7.1.6) {Forventet: ${expected} Reel: ${actual}} Databasen skal kunne sende data om hvilke column navne den tilkoblede tabel har.`);
  }
  catch (error) {
    assert.true(false,
      `7.1 Head metoden er IKKE implementeret endnu! med fejl: ${error}`);
  }

  /* 8.1 */
  expected = true;
  actual = object.info(textoff);
  assert.equal(actual, expected,
    `(8.1) {Returnere true hvis info metoden er implementeret} Databasen skal have en informations metode til hvordan den bruges`);

  await resetDB(object);

  object.connect.end();

  assert.end();
});
