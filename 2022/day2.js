var fs = require('fs');
const array = fs.readFileSync('input2.txt').toString().split("\n");
let runningScore = 0;

const getChoice = (letter) => ({
    A: 'rock',
    B: 'paper',
    C: 'scissors',
}[letter]);

const getOutcome = (letter) => ({
    X: 'lose',
    Y: 'draw',
    Z: 'win',
}[letter]);

const getScoreForChoice = (choice) => ({
    'rock': 1,
    'paper': 2,
    'scissors': 3
}[choice]);

const getPlayerChoiceForOutcome = (opponentChoice, outcome) => playerChoiceForOutcome[opponentChoice][outcome];
const playerChoiceForOutcome = {
    'rock': {
        'win': 'paper',
        'draw': 'rock',
        'lose': 'scissors',
    },
    'paper': {
        'win': 'scissors',
        'draw': 'paper',
        'lose': 'rock',
    },
    'scissors': {
        'win': 'rock',
        'draw': 'scissors',
        'lose': 'paper',
    }
}

const getScoreForRound = (outcome) => {
    if (outcome === 'win') {
        return 6;
    } else if (outcome === 'draw') {
        return 3;
    } else {
        return 0;
    }
}

for (const round of array) {
    if (!round) {
        continue;
    }
    const roundArray = round.split(' ');
    const [opponentChoice, desiredOutcome] = [getChoice(roundArray[0]), getOutcome(roundArray[1])];
    const playerChoice = getPlayerChoiceForOutcome(opponentChoice, desiredOutcome); 
    const scoreForChoice = getScoreForChoice(playerChoice);
    const scoreForRound = getScoreForRound(desiredOutcome);

    runningScore += scoreForRound + scoreForChoice; 
}

console.log(runningScore);

//11186
