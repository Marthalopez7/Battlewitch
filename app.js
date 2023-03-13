boardLayouts = [
    [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ]
];


function buildBoard(type) {
    let board = [];
    if (type == 'offence'){
        board = [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
        ]
    } else if (type == 'defence'){
        board = randomBoard()
    }
    console.log(board);
    return board
}

class Player  {
    constructor(){
        this.offenceMap = buildBoard('offence');
        this.defenceMap = buildBoard('defence');
    }
}

const witches = [
    {
        name: 'test 2x2 witch', // withch' 0'
        img: 'elder-witch.png',
        rows: 2,
        cols: 2
    }
]

const potions = [
    {
        name: 'test1',
        effect: '',
        img: ''
    },
    {
        name: 'test2',
        effect: ''
    },
    {
        name: 'test3',
        effect: ''
    },
    {
        name: 'test4',
        effect: ''
    },
    {
        name: 'test5',
        effect: ''
    },
];

function randomNum(min, max) { // min and max included 
    let number = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(number);
    return number
  }

function randomPotion(){
    return potions[randomNum(0, potions.length - 1)];
}

function randomBoard(){
    return boardLayouts[randomNum(0, boardLayouts.length - 1)];
}

var turn = 0;

const player1 = new Player();
const player2 = new Player();

function displayBoards(player) {
    const offenceBoardHtml = document.getElementById('offence');
    const defenceBoardHtml = document.getElementById('defence'); //todo finish building defence board
    
    for(let row = 0; row < player.offenceMap.length; row++){
        for(let col = 0; col < player.offenceMap[row].length; col++) {
            let element = document.createElement('div');
            element.classList.add('space');
            element.innerText = player.offenceMap[row][col];
            offenceBoardHtml.appendChild(element);
            console.log('test');
        }
    }

    // build defence board
    for(let row = 0; row < player.defenceMap.length; row++){
        for(let col = 0;col < player.defenceMap[row].length; col++) {
            let element = document.createElement('div');
            element.classList.add('space');
            element.innerText = player.defenceMap[row][col];
            defenceBoardHtml.appendChild(element);
            console.log('test');
        }
    }
}

displayBoards(player1);


