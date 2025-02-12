import { Correct, Questions, Submission } from "./types/question";
import { pickBy } from '../utils/data-utils'

export function getCorrectAnswers(submissions: any): Questions {
   if (!submissions[0].submission_data) {
      return null;
   }

   const questions: Questions = {}
   for (let i = 0; i < submissions.length; i++) {
      const submission = submissions[i]
      for (let questionSubmissionRaw of submission.submission_data) {
         const questionId = questionSubmissionRaw.question_id
         let correct: Correct

         if (questionSubmissionRaw.correct == true)
            correct = Correct.TRUE
         else if (questionSubmissionRaw.correct == false)
            correct = Correct.FALSE
         else if (questionSubmissionRaw.correct == 'partial')
            correct = Correct.PARTIAL


         const questionSubmission: Submission = {
            correct: correct,
            text: questionSubmissionRaw.text,
            points: questionSubmissionRaw.points,
            dynamicFields: pickBy(questionSubmissionRaw, (value: any, key: any) => key.startsWith('answer'))
         }
         if (!(questionId in questions)) {
            questions[questionId] = {
               attempts: [],
               bestAnswer: questionSubmission,
               latestAnswer: questionSubmission
            };
         }

         const question = questions[questionId]
         question.attempts.push(questionSubmission);

         if (questionSubmissionRaw.correct == true || question.bestAnswer.points < questionSubmissionRaw.points) {
            question.bestAnswer = questionSubmission
         };
      }
   }

   return questions
}


