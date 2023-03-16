const playingBoardcontainer = document.querySelector('#playingBoard')
// const pbm= document.getElementById("playingBoard")
// const startButton = document.getElementById('start')

const width = 10

function buildBoard(color, playerOne){
    const playingBoard = document.createElement('div')
    playingBoard.classList.add('playing-board')
    playingBoard.style.backgroundColor = color
    playingBoard.id = playerOne

    for (let i = 0; i < width * width; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.id = i
        playingBoard.append(block)
    }
    playingBoardcontainer.append(playingBoard)
}
buildBoard('#2D592C', 'player')
buildBoard('#2D592C', 'computer')

// creating witches and cauldron
class witch {
    constructor(name, length) {
        this.name = name
        this.length = length
    }
}

const cauldron = new witch('cauldron', 1)
const elderWitch = new witch('elderWitch', 2)
const youngWitch = new witch('youngWitch', 1)
const adultWitch = new witch('adultWitch', 2)

const addWitchCharacters = [cauldron, elderWitch, youngWitch, adultWitch]

function addWitch(witch) {
    const playingBoardGrid = document.querySelectorAll('#computer div')
    let randomBoolean = Math.random() < 0.5
    let isHorizontal = randomBoolean
    let randomStartIndex = Math.floor(Math.random() * width * width)
  
    let fixOverlap = isHorizontal ? randomStartIndex <= width * width - witch.length ? randomStartIndex : width * width - witch.length :
    randomStartIndex <= width * width - width * witch.length ? randomStartIndex : randomStartIndex - witch.length * width + width

    let witchBlocks = []

    for (let i = 0; i < witch.length; i++) {
        if (isHorizontal) {  
            witchBlocks.push(playingBoardGrid[Number(fixOverlap) + i])
        } else {
            witchBlocks.push(playingBoardGrid[Number(fixOverlap) + i * width])
        }
    }
    let fix
    if (isHorizontal) {
    witchBlocks.every((_witchBlocks, index) => 
        fix = witchBlocks[0].id % width !== width - (witchBlocks.length - (index + 1)))
    } else {
        witchBlocks.every((_witchBlocks, index) =>
        fix = witchBlocks[0].id < 90 + (width * index + 1) )
    }
 
    const empty = witchBlocks.every(witchBlocks => !witchBlocks.classList.contains('taken'))
    if (fix && empty) {
        witchBlocks.forEach(witchBlocks => {
        witchBlocks.classList.add(witch.name)
        witchBlocks.classList.add('taken')
        })
    } else {
        addWitch(witch)
    }
   
   
}
addWitchCharacters.forEach(witch => addWitch(witch))
// boardLayouts = [
//     [
//         [0,0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0,0]
//     ]

// ];


// function buildBoard(type) {
//     let board = [];
//     if (type == 'offence'){
//         board = [
//             [0,0,0,0,0,0,0,0,0,0],
//             [0,0,0,0,0,0,0,0,0,0],
//             [0,0,0,0,0,0,0,0,0,0],
//             [0,0,0,0,0,0,0,0,0,0],
//             [0,0,0,0,0,0,0,0,0,0],
//             [0,0,0,0,0,0,0,0,0,0],
//             [0,0,0,0,0,0,0,0,0,0],
//             [0,0,0,0,0,0,0,0,0,0],
//             [0,0,0,0,0,0,0,0,0,0],
//             [0,0,0,0,0,0,0,0,0,0]
//         ]
//     } else if (type == 'defence'){
//         board = randomBoard()
//     }
//     console.log(board);
//     return board
// }


// class Player  {
//     constructor(){
//         this.offenceMap = buildBoard('offence');
//         this.defenceMap = buildBoard('defence');
//     }
// }



// const witches = [
//     {
//         name: 'cauldron', 
//         img: 'cauldron.png',
//         rows: 1,
//         cols: 1
//     },
//     {
//         name: 'youngWitch', 
//         img: 'young-witch.png',
//         rows: 1,
//         cols: 2
//     },
//     {
//         name: 'adultWitch', 
//         img: 'adult-witch.png',
//         rows: 2,
//         cols: 3
//     },
//     {
//         name: 'elderWitch', 
//         img: 'elder-witch.png',
//         rows: 2,
//         cols: 2
//     }
// ]


// const potions = [
//     {
//         name: 'Shield',
//         effect: 'When your opponent takes a shot, whether is a hit or miss, you will not take any damage for one turn',
//         img: ''
//     },
//     {
//         name: 'Healing',
//         effect: 'You are able to heal one of your characters (whether it has already fallen or just took some damage)',
//         img: ''
//     },
//     {
//         name: 'Clairvoyance',
//         effect: 'You are able to see one row or column of your opponent’s board',
//         img:''
//     },
//     {
//         name: 'Explosion',
//         effect: 'You may click a square and a cross-shaped explosion will occur',
//         img:''
//     },
//     {
//         name: 'Skip',
//         effect: 'This potion skips your next turn',
//         img:''
//     },

// ];



// addWitchCharacter(cauldron)

// function randomNum(min, max) { // min and max included 
//     let number = Math.floor(Math.random() * (max - min + 1) + min);
//     console.log(number);
//     return number
//   }

// function randomPotion(){
//     return potions[randomNum(0, potions.length - 1)];
// }
// randomPotion()

// function randomBoard(){
//     return boardLayouts[randomNum(0, boardLayouts.length - 1)];
// }
// randomBoard()

// var turn = 0;

// const player1 = new Player();
// const player2 = new Player();

// function displayBoards(player) {
//     const offenceBoardHtml = document.getElementById('offence')
//     const defenceBoardHtml = document.getElementById('defence'); 
    
//     for(let row = 0; row < player.offenceMap.length; row++){
//         for(let col = 0; col < player.offenceMap[row].length; col++) {
//             let element = document.createElement('div');
//             element.classList.add('space');
//             element.innerText = player.offenceMap[row][col];
//             offenceBoardHtml.appendChild(element);
//             console.log('test');
//         }
//     }

//     for(let row = 0; row < player.defenceMap.length; row++){
//         for(let col = 0;col < player.defenceMap[row].length; col++) {
//             let element = document.createElement('div');
//             element.classList.add('space');
//             element.innerText = player.defenceMap[row][col];
//             defenceBoardHtml.appendChild(element);
//         }
//     }
// }

// displayBoards(player1);


