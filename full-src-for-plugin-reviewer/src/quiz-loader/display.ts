import qt from './question-types';
import { getPointElements, isIncorrectChoice, getQuestionIds } from './helpers';
import { Correct, Question, Questions } from './types/question';

export default function display(questions: Questions) {
  const questionElements = document.getElementsByClassName('question');
  const questionTypes = document.getElementsByClassName('question_type') as HTMLCollectionOf<HTMLElement>;
  const numQuestions = questionElements.length;
  const displayer = new Displayer();
  const pointHolders = getPointElements();
  const questionIds = getQuestionIds();

  for (let i = 0; i < numQuestions; i++) {
    const questionType = questionTypes[i].innerText;
    const questionId = questionIds[i];

    if (questions[questionId]) {
      const question = questions[questionId];

      try {
        switch (questionType) {
          case qt.ESSAY_QUESTION:
            displayer.displayEssay(question, questionId);
          case qt.MATCHING:
            displayer.displayMatching(question, questionId);
            break;
          case qt.MULTIPLE_DROPDOWN:
            displayer.displayMultipleDropdowns(question, questionId);
            break;
          case qt.MULTIPLE_ANSWER:
            displayer.displayMultipleAnswer(question, questionId);
            break;
          case qt.MULTIPLE_CHOICE:
          case qt.TRUE_FALSE:
            displayer.displayMultipleChoise(question, questionId);
            break;
          case qt.FILL_IN_BLANK:
          case qt.FORMULA_QUESTION:
          case qt.NUMERICAL_ANSWER:
            displayer.displayFillInBlank(question, questionId);
            break;
          case qt.FILL_IN_MULTIPLE_BLANKS:
            displayer.displayFillInMultipleBlank(question, questionId)
            break
        }
      } catch (e) {
        console.error(`Failed to display question results for ${questionType}.`, question)
      }

      const earnedPoints = Math.round(question.bestAnswer.points * 100) / 100;
      if (earnedPoints == parseFloat(pointHolders[i].innerText)) {
        pointHolders[i].classList.add("correct-answer");
      } else {
        pointHolders[i].classList.add("incorrect-answer");
      }
      pointHolders[i].innerText = `${earnedPoints} out of ${pointHolders[i].innerText}`;
    } else {
      pointHolders[i].innerText = `(New Question) ${pointHolders[i].innerText}`;
    }
  }
}

export class Displayer {
  displayMatching(question: Question, questionId: number) {
    if (!question) {
      return;
    }

    const selectElements = document.querySelectorAll<HTMLSelectElement>(`#question_${questionId} select`)
    for (const el of selectElements) {
      if (el.value) return
    }

    const bestAnswer = question.bestAnswer

    for (let answerProperty in bestAnswer.dynamicFields) {
      if (answerProperty.includes('answer_')) {
        const answerId = `question_${questionId}_${answerProperty}`;
        const input = document.getElementById(answerId) as HTMLInputElement
        input.value = bestAnswer.dynamicFields[answerProperty];
        input.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }
  }

  displayMultipleDropdowns(question: Question, questionId: number): void {
    if (!question) {
      return;
    }

    const questionEl = document.getElementById(`question_${questionId}`)
    const selectElements = document.querySelectorAll<HTMLSelectElement>(`#question_${questionId} select`)
    for (const el of selectElements) {
      if (el.value) return
    }

    const bestAnswer = question.bestAnswer
    for (let answerProperty in bestAnswer.dynamicFields) {
      if (answerProperty.includes('answer_id_for')) {
        const answerId = bestAnswer.dynamicFields[answerProperty]
        const selectEl: HTMLSelectElement = questionEl.querySelector(`option[value='${answerId}']`).parentElement as HTMLSelectElement
        selectEl.value = answerId
        selectEl.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }
  }

  displayMultipleAnswer(question: Question, questionId: number) {
    if (!question) {
      return;
    }

    const checkboxElements = document.querySelectorAll<HTMLInputElement>(`#question_${questionId} input[type="checkbox"]`)
    for (const el of checkboxElements) {
      if (el.checked) return
    }

    const bestAnswer = question.bestAnswer

    for (let answerProperty in bestAnswer.dynamicFields) {
      if (answerProperty.includes('answer_')) {
        const answerId = `question_${questionId}_${answerProperty}`;
        const input = document.getElementById(answerId) as HTMLInputElement
        input.checked = parseInt(bestAnswer.dynamicFields[answerProperty]) === 1
        input.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }
  }

  displayMultipleChoise(question: Question, questionId: number) {
    if (!question) {
      return;
    }

    const incorrectAnswers = new Set<number>()
    for (const attempt of question.attempts) {
      const answerId = parseInt(attempt.text)
      if (attempt.correct !== Correct.TRUE && !isNaN(answerId))
        incorrectAnswers.add(answerId)
    }

    for (let answerId of incorrectAnswers) {
      const answerIDStr = `question_${questionId}_answer_${answerId}`;
      const el = document.getElementById(answerIDStr)
      el.parentElement.nextElementSibling.classList.add('incorrect-answer')
    }

    // prevent overriding user answer
    const options = document.querySelectorAll<HTMLInputElement>(`#question_${questionId} input`)
    for (let option of options) {
      if (option.checked) return
    }

    if (!('answer_id' in question.bestAnswer.dynamicFields)) {
      return;
    }

    const answerId = `question_${questionId}_answer_${question.bestAnswer.text}`;
    const el = document.getElementById(answerId) as HTMLInputElement;

    if (!el) {
      return;
    }

    if (!isIncorrectChoice(el)) {
      el.checked = true;
      el.dispatchEvent(new Event('change', { bubbles: true }))
    }

    // if only one left, select it
    // if (!answer.correct === true) {
    //    const possibleAnswers = el.parentElement.parentElement.parentElement.parentElement.children;
    //    if (possibleAnswers.length - answer.attemptedAnswers.length === 1) {
    //       for (let answerEl of possibleAnswers) {
    //          const checkbox = answerEl.firstElementChild.firstElementChild.firstElementChild;
    //          if (!isIncorrectChoice(checkbox)) {
    //             checkbox.checked = true;
    //          }
    //       }
    //    }
    // }
  }

  displayFillInBlank(question: Question, questionId: number) {
    if (!question) {
      return;
    }

    const bestAnswer = question.bestAnswer

    let element: HTMLInputElement = null;
    const elements = document.getElementsByName(`question_${questionId}`);
    for (let el of elements) {
      if (el.tagName === 'INPUT') {
        element = el as HTMLInputElement;
        break;
      }
    }

    if (!element.value) {
      element.value = bestAnswer.text;
      element.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }

  displayEssay(question: Question, questionId: number, retry = 15, interval = 500) {
    if (!question) {
      return;
    }

    const latestAnswer = question.latestAnswer

    let topParent: HTMLElement;
    setTimeout(() => {
      try {
        topParent = document.getElementById(`question_${questionId}_question_text`);
        const parent = topParent.nextElementSibling.querySelector<HTMLObjectElement>('#question_input_0_ifr');
        const iframe = parent.contentDocument ? parent.contentDocument : parent.contentWindow.document;
        setTimeout(() => {
          const input = iframe.getElementById('tinymce')
          if (input.innerHTML == '<p><br data-mce-bogus="1"></p>') {
            input.innerHTML = latestAnswer.text
            input.dispatchEvent(new Event('input', { bubbles: true }))
          }
        }, 0)
      } catch (e) {
        if (retry > 0) {
          this.displayEssay(question, questionId, retry - 1)
        } else {
          topParent.innerHTML += `<b><div>Previous answer</div></b><p>${latestAnswer.text}</p>`;
        }
      }
    }, interval);
  }

  displayFillInMultipleBlank(question: Question, questionId: number) {
    if (!question) {
      return;
    }

    const bestAnswer: {[dynamic: string]: any } = structuredClone(question.bestAnswer.dynamicFields)
    for (const attempt of question.attempts) {
      for (const field in attempt.dynamicFields) {
        if (field.startsWith('answer_id_for_') && attempt.dynamicFields[field] != null) {
          const valueKey = `answer_for${field.replace('answer_id_for', '')}`
          bestAnswer[field] = attempt.dynamicFields[field]
          bestAnswer[valueKey] = attempt.dynamicFields[valueKey]
        }
      }
    }

    const topParent = document.getElementById(`question_${questionId}_question_text`).parentElement;
    const bestAnswers = Object.keys(bestAnswer)
      .filter(key => key.includes('answer_for'))
      .map(key => {
        const idKey = `answer_id_for${key.replace('answer_for', '')}`
        const className = bestAnswer[idKey] != null ? 'checkmark' : 'cross'
        return `<li class="${className}">${key.replace(/_/g, ' ')}: ${bestAnswer[key]}</li>` 
      })

    const latestAnswers = Object.keys(question.latestAnswer.dynamicFields)
      .filter(key => key.includes('answer_for'))
      .map(key => {
        const idKey = `answer_id_for${key.replace('answer_for', '')}`
        const className = question.latestAnswer.dynamicFields[idKey] != null ? 'checkmark' : 'cross'
        return `<li class="${className}">${key.replace(/_/g, ' ')}: ${question.latestAnswer.dynamicFields[key]}</li>` 
      })

    const additionalHtml = `
      <div class="fill-in-multiple-blank-extra-info">
        <div class="answers-panel" >
          <div class="best-answer">
            <h4>Best Answer</h4>
            <ul class="answer-list">
              ${bestAnswers.join('')}
            </ul>
          </div>
          <br>
          <div class="latest-answer">
            <h4>Latest Answer</h4>
            <ul class="answer-list">
              ${latestAnswers.join('')}
            </ul>
          </div>
        </div>
      </div>
    `

    const parsedHtml = new DOMParser().parseFromString(additionalHtml, 'text/html')
    topParent.prepend(parsedHtml.body.firstElementChild)
  }
}
