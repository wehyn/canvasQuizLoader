export function getPointElements(): HTMLElement[] {
    const pointHolders = document.getElementsByClassName('question_points_holder') as HTMLCollectionOf<HTMLElement>;
    let cleanPointHolders = [];

    // clean points
    for (let pointHolder of pointHolders) {
        const classList = pointHolder.parentElement.classList;
        for (let i = 0; i < classList.length; i++) {
            if (classList[i] == 'header') {
                cleanPointHolders.push(pointHolder);
                continue;
            }
        }
    }

    return cleanPointHolders;
}

export function isIncorrectChoice(el: HTMLElement) {
    return el.parentElement.nextElementSibling.className.includes('incorrect-answer');
}

export function getQuestionIds() {
    const questionIds: number[] = []
    const questionTextEls = document.getElementsByClassName('original_question_text');
    for (let el of questionTextEls) {
        questionIds.push(parseInt(el.nextElementSibling.id.split('_')[1]));
    }
    return questionIds;
}