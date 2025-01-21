export interface Question {
  bestAnswer: Submission
  latestAnswer: Submission
  attempts: Submission[],
}

export interface Questions {
  [questionId: string]: Question
}

export interface Submission {
  correct: Correct
  points: number
  text: string
  dynamicFields?: {
    [dynamic: string]: any
  }
}

export enum Correct {
  TRUE = 'true',
  FALSE = 'false',
  PARTIAL = 'partial',
}

export enum QuestionType {
  MULTIPLE_CHOICE,
  TRUE_FALSE,
  FILL_IN_BLANK,
  FILL_IN_MULRIPLE_BLANKS,
  MULTIPLE_ANSWER,
  MULTIPLE_DROPDOWN,
  MATCHING,
  NUMERICAL_ANSWER,
  FORMULA_QUESTION,
  ESSAY_QUESTION
}