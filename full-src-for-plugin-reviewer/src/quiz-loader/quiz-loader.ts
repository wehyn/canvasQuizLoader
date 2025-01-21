import { getQuizSubmissions } from './submissions';
import { getCorrectAnswers } from './answers';
import display from './display';

loadQuiz();

async function loadQuiz(): Promise<void> {
    const currentURL = window.location.href;
    const courseId = parseInt(currentURL.split('courses/')[1].split('/')[0]);
    const quizId = parseInt(currentURL.split('quizzes/')[1].split('/')[0]);
    const urlTokens = currentURL.split('/');
    const baseUrl = `${urlTokens[0]}//${urlTokens[2]}/`;

    if (!courseId) {
        console.error('Unable to retrieve course id');
    } else if (!quizId) {
        console.error('Unable to retrieve quiz id');
    }

    const submissions = await getQuizSubmissions(courseId, quizId, baseUrl);
    const correctAnswers = getCorrectAnswers(submissions);
    console.log(correctAnswers)

    if (!correctAnswers) {
        return null;
    }

    display(correctAnswers);
};

const script = document.createElement('script');
script.innerHTML = "confirm = function(){return true;}"
document.body.appendChild(script);
/*
    TODO
    * Don't paste in inccorect answers (or have an option to view past answers)
    * Don't overwrite what is already there
    * Create seetings



    Settings:
    * Autoselect last available option in multiple choice and true/false questions
    * Enable disable the app
    * Multiple choice and True/False helper
    *   disable incorrect answer
    *   color code incorrect answer
    * If correct answer is not found:
    *   apply answer from latest attempt
    *   apply best answer
*/
