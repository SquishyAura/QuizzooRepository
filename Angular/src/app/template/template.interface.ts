export interface Template {
    title: string;
    owner: string;
    questions: Questions[];
    access: string;
}

export interface Questions {
    questionText: string;
    answers: Answers[];
    type: string;
}

export interface Answers {
    answerText:string;
    correctAnswer: boolean;
}