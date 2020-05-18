/* For at scriptet virker kræves det at insertHTMLElements.js er loadet inden dennne fil */

/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

let fieldCount = 0;

function createInputField(appendToThis, type, minimumFieldCount) {
  fieldCount++;
  const container = appendDomNode(`DIV`, appendToThis, undefined, [{ class: `${type.toLowerCase()}Container` }]);
  const label = appendDomNode(`LABEL`, container, `${type}:`);
  label.htmlFor = `${type.toLowerCase()}${fieldCount}`;
  appendDomNode(`INPUT`, container, `Indtast dit ${type.toLowerCase()} her`, [{ class: `${type.toLowerCase()}Input` }, { id: `${type.toLowerCase()}${fieldCount}` }]);
  const removeFieldBtn = appendDomNode(`BUTTON`, container, `X`, [{ class: `remove${type}Btn` }, { class: `btn` }, { class: `btn-danger` }]);
  removeFieldBtn.addEventListener(`click`, () => {
    const amountOfInputFields = appendToThis.getElementsByClassName(`${type.toLowerCase()}Container`).length;
    if (amountOfInputFields > parseInt(minimumFieldCount)) {
      container.remove();
    }
    else {
      displayErrorMessage(appendToThis, `Du skal indtaste mindst ${parseInt(minimumFieldCount)} ${type.toLowerCase()}.`);
    }
  });
  return container;
}

function displayErrorMessage(container, message) {
  const messageNode = appendDomNode(`P`, container, `Fejl! ${message}`);
  messageNode.style.color = `red`;
  setTimeout(() => {
    messageNode.remove();
  }, 5000);
}