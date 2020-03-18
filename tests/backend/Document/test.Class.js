const tape = require(`tape`);
const testDecorater = require(`tape-promise`).default;

const test = testDecorater(tape);
const { Document } = require(`../../../node/Document/Document.js`);
let actual = true;
let expected = true;
let object = new Document();

test(`Test af Document Klassen i node/Document`, (assert) => {
  assert.equal(actual, expected, `Testen skulle gerne være oprettet.`);

  object = new Document();
  actual = object.name;
  expected = `Document`;

  assert.equal(actual, expected, `{Forventet: ${expected} Reel: ${actual}} Klassen skulle gerne have navn efter sig selv`);

  assert.end();
});