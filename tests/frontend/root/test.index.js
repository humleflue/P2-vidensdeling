const tape = require(`tape`);
const testDecorater = require(`tape-promise`).default;

const test = testDecorater(tape);
let actual = true;
let expected = true;

test(`Test af Index i www/index.js`, (assert) => {
  assert.equal(actual, expected, `Testen skulle gerne være oprettet.`);

  actual = true;
  expected = true;

  assert.end();
});
