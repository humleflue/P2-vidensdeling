/* eslint no-undef: 0 */

const questionDivs = document.getElementsByClassName(`questionDiv`);

/* Formål: Dette forloop checker hvert spørgsmåls div igennem og tilføjer grøn farve hvis brugeren havde
           svaret rigtigt og rød hvis forkert. Kalder funktioner, der viser hvilke svar brugeren havde indtastet
           samt hvilke svar der er de rigtige.
*/
for (let i = 1; i <= questionDivs.length; i++) {
  if (data.evaluation[i - 1].result === `true`) { // "data" bliver sendt med EJSen
    document.querySelector(`#question${i}`).classList.add(`true`);
  }
  else {
    document.querySelector(`#question${i}`).classList.add(`false`);
  }

  const htmlAnswersArray = document.querySelector(`#question${i}`).getElementsByTagName(`p`);
  showTheUsersAnswers(htmlAnswersArray, i);
  showTheCorrectAnswers(htmlAnswersArray, i);
}

/* Formål: Viser hvilket svar der er det korrekte ud for en spørgsmålsdiv */
function showTheCorrectAnswers(htmlAnswersArray, i) {
  const correctAnswers = data.quizQuestions[i - 1].correctness.split(`;`); // "data" bliver sendt med EJSen
  correctAnswers.forEach((answer, index) => {
    if (answer === `true`) {
      htmlAnswersArray[index].innerHTML += ` - (Dette var det korrekte svar) <i class="fa fa-check"></i>`;
      htmlAnswersArray[index].classList.add(`correctAnswer`);
    }
  });
}

/* Formål: Viser hvilket svar brugeren har angivet ud for et bestemt spørgsmålsdiv. */
function showTheUsersAnswers(htmlAnswersArray, i) {
  const userAnswersArray = data.evaluation[i - 1].userAnswers.split(`;`); // "data" bliver sendt med EJSen
  userAnswersArray.forEach((answer, index) => {
    if (answer === `true`) {
      htmlAnswersArray[index].innerHTML += ` - (Dit svar)`;
      htmlAnswersArray[index].classList.add(`userAnswer`);
    }
  });
}
