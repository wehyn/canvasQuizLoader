var courseId = 53;
var quizId = 1;


var jsonStructure = {
    [courseId]: {
        [quizId]: [
            {
                questionId: "Yahallo",
                correctAnswerId: "correctAnswer",
                choices: [
                    {
                        choiceId: "A"
                    },
                ]
            }
        ]
    }
}


jsonStructure[courseId][quizId].push({
    courseId: courseId,
    correctAnswerId: "correctAnswer",
    choices: [
        {
            choiceId: "B"
        },
    ]
});

console.log(JSON.stringify(jsonStructure, null, 1));