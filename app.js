// custom cursor
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", setMousePosition, false);

function moveCursor(timestamp) {
    customCursor.style.setProperty("--cursorXPos", mouseX + "px");
    customCursor.style.setProperty("--cursorYPos", mouseY + "px");

    requestAnimationFrame(moveCursor);
}
requestAnimationFrame(moveCursor);

function setMousePosition(event){
    mouseX = event.clientX;
    mouseY = event.clientY;
}

const playingBoardcontainer = document.querySelector('#playingBoard')
const optionsContainer = document.querySelector('#options-container')
const rotateButton = document.querySelector('#rotate-button')
const sumbitButton = document.querySelector('#submit')
const infoDisplay = document.querySelector("#info")
const turnDisplay = document.querySelector("#whose-turn")
const width = 10

// roatates the witches in the option container to 90 then back to 0 then 90
let angle = 0
function rotate() {
    const rotateWitch = Array.from(optionsContainer.children)
    angle = angle === 0 ? 90 : 0
    rotateWitch.forEach(rotateWitch => rotateWitch.style.transform = `rotate(${angle}deg)`)
}
rotateButton.addEventListener('click', rotate)

// buildboards function
function buildBoard(color, user){
    const playingBoard = document.createElement('div')
    playingBoard.classList.add('playing-board')
    playingBoard.style.backgroundColor = color
    playingBoard.id = user

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
class Witch {
    constructor(name, length) {
        this.name = name
        this.length = length
    }
}
// const witchArray = [
//     {
//         name: 'elder', 
//         img: 'images\elder-witch.png',
//         rows: 2,
//         cols: 2
//     },
//     {
//         name: 'caul', 
//         img: 'images\cauldron.png',
//         rows: 2,
//         cols: 2
//     },
//     {
//         name: 'young', 
//         img: 'images\young-witch.png',
//         rows: 2,
//         cols: 2
//     },
//     {
//         name: 'adult', 
//         img: 'images\adult-witch.png',
//         rows: 2,
//         cols: 2
//     },
//     {
//         name: 'cat', 
//         img: 'images\cat-mascot.png',
//         rows: 2,
//         cols: 2
//     },
// ];

const cauldron = new Witch('caul', 1)
const elderWitch = new Witch('elder', 4)
const youngWitch = new Witch('young', 2)
const adultWitch = new Witch('adult', 3)
const catWitch = new Witch('cat', 5)

const witchContainer = [cauldron, elderWitch, youngWitch, adultWitch, catWitch]

// const cauldronExplosion = cauldronEvent()

// function cauldronEvent() {

// }

// switch cauldronExplosion() {

// }

let notDropped

// add witchcharacters to board randomly 
// function addWitch(witch) {
//     let randomDirection = Math.floor(Math.random() * witch.rows.cols.length)
//     let present = witch.rows.cols[randomDirection]
//     if (randomDirection === 0) 
// }
function addWitch(user, witch, startId) {
    const allGridsqaures = document.querySelectorAll(`#${user} div`)
    let randomBoolean = Math.random() < 0.5
    let isHorizontal = user === 'player' ?  angle === 0 : randomBoolean
    let randomStartIndex = Math.floor(Math.random() * width * width)
    let startIndex = startId ? startId : randomStartIndex
    let gridBorder = isHorizontal ? startIndex <= width * width - Witch.Length ? startIndex : width * width - Witch.Length:
    startIndex <= width * width - width * Witch.Length ? startIndex : startIndex - Witch.Length * width + width

    let witchBlocks = []

    for (let i = 0; i < Witch.length; i++) {
        if (isHorizontal) {  
            witchBlocks.push(allGridsqaures[Number(gridBorder) + i])
        } else {
            witchBlocks.push(allGridsqaures[Number(gridBorder) + i * width])
        }
    }

    let fix
    if (isHorizontal) {
    witchBlocks.every((index) => 
        fix = witchBlocks[0].id % width !== width - (witchBlocks.length - (index + 1)))
    } else {
        witchBlocks.every((_witchBlocks, index) =>
        fix = witchBlocks[0].id < 90 + (width * index + 1) )
    }
        
    const empty = witchBlocks.every(witchBlocks => !witchBlocks.classList.contains('taken'))
    if (fix && empty) {
        witchBlocks.forEach(witchBlocks => {
        witchBlocks.classList.add('witchName')
        witchBlocks.classList.add('taken')
        witchBlocks.classList.add('type')
        })
    } else {
        if (user === 'computer') addWitch('computer', witch, startId);
        if (user === 'player') notDropped = true
    }
   
  
}
witchContainer.forEach(witch => addWitch('computer', witch))

const potionArray {
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
    {
        name: 'test6',
        effect: ''
    },
}

function potionEvent(potionArray) {
    
}

// draggable witches
let draggedWitch
const optionWitchArray = Array.from(optionsContainer.children)
optionWitchArray.forEach(optionWitch => optionWitch.addEventListener('dragstart', dragStart))

const allPlayerSquares = document.querySelectorAll('#player div')
allPlayerSquares.forEach(playerBlock => {
    playerBlock.addEventListener('dragover', dragOver)
    playerBlock.addEventListener('drop', dropWitch)
})

function dragStart(e){
    notDropped = false
    draggedWitch = e.target
}

function dragOver(e) {
    e.preventDefault()
    
}

function dropWitch(e) {
    const startId = e.target.id
    const witch = witchContainer[draggedWitch.id]
    addWitch('player', witch, startId)
    if(!notDropped) {
        draggedWitch.remove()
    }
}

// start game function 
let gameOver = false
let playerTurn

function startGame() {
    if (playerTurn === undefined) {
        if (optionsContainer.children.length != 0) {
        infoDisplay.textContent = "Place all witches on board"
    } else {
        const computerSqaures = document.querySelectorAll("#computer div")
        computerSqaures.forEach(block => block.addEventListener('click', handleClick))
        playerTurn = true
        turnDisplay.textContent = 'Your turn'
        infoDisplay.textContent = 'Begin your battle'
    }
    }   
}
sumbitButton.addEventListener('click', startGame)

// gets the info for the game (which sqaure they click) if its a hit or mis 
let playerHits = []
let computerHits = []
const playerDedWitch = []
const opponentDedWitch = []

function handleClick(e) {
    if (!gameOver) {
        if(e.target.classList.contains('taken')) {
            e.target.classList.add('hit')
            infoDisplay.textContent = "You hit an opponent's witch!"
            let classes = Array.from(e.target.classList)
           classes = classes.filter(className => className !== 'block')
           classes =classes.filter(className => className !== 'hit')
           classes = classes.filter(className => className !== 'taken')
            playerHits.push(...classes)
            checkWitchDed('player', playerHits, playerDedWitch)
        }
        if (!e.target.classList.contains('taken')) {
            infoDisplay.textContent = 'Miss!'
            e.target.classList.add('nothing')
        } 
        playerTurn = false
       const allGridsqaures = document.querySelectorAll('#computer div')
       allGridsqaures.forEach(block => block.replaceWith(block.cloneNode(true)))
       setTimeout(opponetsturn, 2000)
    }
}

// runs computer turn (gives it two turns to try )
function opponetsturn() {
    if (!gameOver) {
        turnDisplay.textContent = "Opponent's turn..."
        infoDisplay.textContent = "Opponent launching potion..."
        setTimeout(() => {
            let randomturn = Math.floor(Math.random() * width * width)
            const allGridsqaures = document.querySelectorAll('#player div')

            if( allGridsqaures[randomturn].classList.contains('taken') &&
                !allGridsqaures[randomturn].classList.contains('hit')
            ) {
                opponetsturn()
                return
            } else if (
                allGridsqaures[randomturn].classList.contains('taken') &&
                !allGridsqaures[randomturn].classList.contains('hit')
            ) {
                allGridsqaures[randomturn].classList.add('hit')
                infoDisplay.textContent = "Opponet hit a witch!"
                let classes = Array.from(allGridsqaures[randomturn].classList)
                classes = classes.filter(className => className !== 'block')
                classes = classes.filter(className => className !== 'hit')
                classes = classes.filter(className => className !== 'taken')
        
                computerHits.push(...classes)
                checkWitchesDed('computer', computerHits, opponentDedWitch)
            } else {
                infoDisplay.textContent ='Miss!'
                allGridsqaures[randomturn].classList.add('nothing')
            }          
        }, 2000)
        setTimeout(() => {
            playerTurn = true
            turnDisplay.textContent ='Your turn!'
            infoDisplay.textContent = 'launch a potion!'
            const allGridsqaures = document.querySelectorAll('#computer div')
            allGridsqaures.forEach(block => block.addEventListener('click', handleClick))
        }, 4000)
    }
}

// this should check the number of witches hit from the playerHits and computerHits and end game 
function checkWitchesDed(user, userHits, userDedWitch) {

    function checkWitch(witchName, witchLength) {
    
        if (userHits.filter(storedWitchName => storedWitchName === witchName).length === witchLength) {
            infoDisplay.textContent =`You revealed your opponent's ${witchName}`
        }
        if (user === 'player') {
                playerHits = userHits.filter(storedWitchName => storedWitchName !== witchName)
        }
        if (user === 'computer') {
                infoDisplay.textContent =`Your opponent hit your ${witchName}`
                computerHits = playerHits.filter(storedWitchName => storedWitchName !== witchName)
         }
        userDedWitch.push(witchName)
        }
    checkWitch('caul', 1)
    checkWitch('elder', 4)
    checkWitch('young', 2)
    checkWitch('adult', 3)
    checkWitch('cat', 5)
    console.log("playerHits", playerHits)
    console.log("playerDedWitch", playerDedWitch)

    if (playerDedWitch.length === 5) {
        infoDisplay.textContent = 'All enemy witches revealed, you win!'
        gameOver = true
    }
    if(opponentDedWitch.length === 5) {
        infoDisplay.textContent = 'All your witches have been revealed, you lose. Do better.'
        gameOver = true
    }
}
    
