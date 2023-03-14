
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
        name: 'cauldron', 
        img: 'cauldron.png',
        rows: 1,
        cols: 1
    },
    {
        name: 'young witch', 
        img: 'young-witch.png',
        rows: 1,
        cols: 2
    },
    {
        name: 'adult witch', 
        img: 'adult-witch.png',
        rows: 1,
        cols: 3
    },
    {
        name: 'elder witch', 
        img: 'elder-witch.png',
        rows: 2,
        cols: 2
    }
]

const potions = [
    {
        name: 'Shield',
        effect: 'You will not take any damage for one turn',
        img: 'potion.png'
    },
    {
        name: 'Healing',
        effect: 'Heal one of your characters (whether it has already fallen or took some damage)',
        img: 'potion.png'
    },
    {
        name: 'Clairvoyance',
        effect: 'Expose one row or column of your opponent’s board',
        img:'potion.png'
    },
    {
        name: 'Explosion',
        effect: 'Your next shot will be a cross-shaped explosion',
        img:'potion.png'
    },
    {
        name: 'Skip',
        effect: 'Skips your turn',
        img:'potion.png'
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
    const defenceBoardHtml = document.getElementById('defence'); 
    
    for(let row = 0; row < player.offenceMap.length; row++){
        for(let col = 0; col < player.offenceMap[row].length; col++) {
            let element = document.createElement('div');
            element.classList.add('space');
            element.innerText = player.offenceMap[row][col];
            offenceBoardHtml.appendChild(element);
            console.log('test');
        }
    }

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




dragElement(document.getElementById("options-container"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "options-container")) {
    document.getElementById(elmnt.id + "options-container").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}