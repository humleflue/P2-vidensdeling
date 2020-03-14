const tape = require(`tape`);
const testDecorater = require(`tape-promise`).default;

const test = testDecorater(tape);

const { addFour } = require(`../../../node/calculation/calculation.js`);

test(`Async Funktionen addFour i node/calculation/calculation.js`, async (assert) => {
  const expected = 6;
  try {
    const actual = await addFour(2);
    assert.equal(actual, expected,
      `Funktionen skal kunne lægge 4 til et vilkårligt tal`);
  }
  catch (error) {
    assert.false(false, `Async Funcktionen resolvede ikke, men catchede: ${error}`);
  }

  assert.end();
});

test(`Async Funktionen addFour i node/calculation/calculation.js`, async (assert) => {
  const expected = 6;
  try {
    const actual = await addFour(`2`);
    assert.equal(actual, expected,
      `Funktionen skal kunne omdanne en streng til det tilsvarende tal`);
  }
  catch (error) {
    assert.false(false, `Async Funcktionen resolvede ikke, men catchede: ${error}`);
  }

  assert.end();
});