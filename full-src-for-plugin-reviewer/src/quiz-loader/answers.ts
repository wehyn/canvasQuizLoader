import { Correct, Questions, Submission } from "./types/question";
import { pickBy } from '../utils/data-utils'

export function getCorrectAnswers(submissions: any): Questions {
   if (!submissions[0].submission_data) {
      return null;
   }

   console.log(submissions)
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



   // console.log(submissions)
   // let parsedSubmissions: any = {};
   // let submission = restructureSubmission(submissions[0]);
   // if (!submission) {
   //    return null;
   // }



   // for (let i = 0; i < submissions.length; i++) {
   //    submission = restructureSubmission(submissions[i]);
   //    for (let questionId in submission) {
   //       const question = submission[questionId]

   //       if (!(questionId in parsedSubmissions)) {
   //          parsedSubmissions[questionId] = {};
   //          parsedSubmissions[questionId]['attemptedAnswers'] = [];
   //          parsedSubmissions[questionId]['bestAttempt'] = question;
   //          parsedSubmissions[questionId]['latestAttempt'] = question;
   //       }

   //       if (parsedSubmissions[questionId].bestAttempt.correct == true) {
   //          continue;
   //       };

   //       if (question.correct == true) {
   //          parsedSubmissions[questionId].bestAttempt = question;
   //       } else if (parsedSubmissions[questionId].bestAttempt.points < question.points) {
   //          parsedSubmissions[questionId].bestAttempt = question;
   //       } else {
   //          parsedSubmissions[questionId].attemptedAnswers.push(question);
   //       }
         
   //    }
   // }

   // return parsedSubmissions;
}


function restructureSubmission(submission: any): any {
   if (!submission.submission_data) {
      return null;
   }

   let restructuredSubmission: any = {};
   for (let question of submission.submission_data) {
      restructuredSubmission[question.question_id] = question;
   }
   return restructuredSubmission;
}
