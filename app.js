const playingBoardcontainer = document.querySelector('#playingBoard')
const optionsContainer = document.querySelector('#options-container')
const rotateButton = document.querySelector('#rotate-button')
const sumbitButton = document.querySelector('#submit')
const infoDisplay = document.querySelector("#info")
const turnDisplay = document.querySelector("#whose-turn")

let angle = 0
function rotate() {
    const rotateWitch = Array.from(optionsContainer.children)
    angle = angle === 0 ? 90 : 0
    rotateWitch.forEach(rotateWitch => rotateWitch.style.transform = `rotate(${angle}deg)`)
}

rotateButton.addEventListener('click', rotate)

const width = 10

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

const cauldron = new Witch('caul', 1)
const elderWitch = new Witch('elder', 4)
const youngWitch = new Witch('young', 2)
const adultWitch = new Witch('adult', 3)

const allWitchCharacters = [cauldron, elderWitch, youngWitch, adultWitch]
let notDropped
// ai 
function addWitch(user, witch, startId) {
    const allGridsqaures = document.querySelectorAll(`#${user} div`)
    let randomBoolean = Math.random() < 0.5
    let isHorizontal = user === 'player' ?  angle === 0 : randomBoolean
    let randomStartIndex = Math.floor(Math.random() * width * width)
    let startIndex = startId ? startId : randomStartIndex
    let gridBorder = isHorizontal ? startIndex <= width * width - witch.length ? startIndex : width * width - witch.length :
    startIndex <= width * width - width * witch.length ? startIndex : startIndex - witch.length * width + width

    let witchBlocks = []

    for (let i = 0; i < witch.length; i++) {
        if (isHorizontal) {  
            witchBlocks.push(allGridsqaures[Number(gridBorder) + i])
        } else {
            witchBlocks.push(allGridsqaures[Number(gridBorder) + i * width])
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
        if (user === 'computer') addWitch('computer', witch, startId);
        if (user === 'player') notDropped = true
    }
   
  
}
allWitchCharacters.forEach(witch => addWitch('computer', witch))

// draggable witches
let draggedWitch
const optionWitch = Array.from(optionsContainer.children)
optionWitch.forEach(optionWitch => optionWitch.addEventListener("dragStart", dragStart))

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
    const witch = allWitchCharacters[draggedWitch.id]
    addWitch('player', witch, startId)
    if(!notDropped) {
        draggedWitch.remove()
    }
}
sumbitButton.addEventListener('click', startGame)

let gameOver = false
let playerTurn

function startGame() {
    if (playerTurn === undefined) {
        if (optionContainer.children.length != 0) {
        infoDisplay.textContent = "Place all witches on board"
    } else {
        const allGridsqaures = document.querySelectorAll("#computer div")
        allGridsqaures.forEach(block => block.addEventListener('click', handleClick))
        playerTurn = true
        turnDisplay.textContent = 'Your turn'
        infoDisplay.textContent = 'Begin your battle'
    }
    }   
}

let playerHits = []
let computerHits = []
const playerDedWitch = []
const opponentDedWitch = []
function handleClick(e) {
    if (!gameOver) {
        if(e.target.classList.contains('taken')) {
            e.target.classList.add('hit')
            infoDisplay.textContent = "You hit an opponent's ship!"
            let classes = Array.from(e.target.classList)
            classes.filter(className => className !== 'block')
            classes.filter(className => className !== 'hit')
            classes.filter(className => className !== 'taken')
            playerHits.push(...classes)
            checkWitches('player', playerHits, playerDedWitch)
        }
        if (e.target.classList.contain('taken')) {
            infoDisplay.textContent = 'Miss!'
            e.target.classList.add('nothing')
        }
        playerTurn = false
       const allGridsqaures = document.querySelectorAll('#computer div')
       allGridsqaures.forEach(block => block.replaceWith(block.cloneNode(true)))
       setTimeout(opponetsturn, 2000)
    }
}

function opponetsturn() {
    if (!gameOver) {
        turnDisplay.textContent = "Opponent's turn..."
        turnDisplay.textContent = "Opponent launching potion..."
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
                classes.filter(className => className !== 'block')
                classes.filter(className => className !== 'hit')
                classes.filter(className => className !== 'taken')
                computerHits.push(...classes)
                checkWitches('computer', computerHits, opponentDedWitch)
            } else {
                infoDisplay.textContent ='Miss'
                allGridsqaures[randomturn].classList.add('empty')
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

function checkWitches(user, userHits, userDedWitch) {
    function checkWitchType(witchName, witchLength) {
        if (userHits.filter(storedWitchName => storedWitchName === witchName).length === witchLength) {
            infoDisplay.textContent =`You revealed your opponent's ${witchName}`
            if (user === 'player') {
                playerHits = userHits.filter(storedWitchName => storedWitchName !== witchName)
            }
            if (user === 'computer') {
                infoDisplay.textContent =`Your opponent hit your ${witchName}`
                computerHits = userHits.filter(storedWitchName => storedWitchName !== witchName)
            }
            userDedWitch.push(witchName)
        }
    }
    checkWitchType('caul', 1)
    checkWitchType('elder', 4)
    checkWitchType('young', 2)
    checkWitchType('adult', 3)
    console.log("playerHits", playerHits)
    console.log("playerDedWitch", playerDedWitch)

    if (playerDedWitch.length === 4) {
        infoDisplay.textContent = 'All enemy witches revealed, you win!'
        gameOver = true
    }
    if(opponentDedWitch.length === 4) {
        infoDisplay.textContent = 'All your witches have been revealed, you lose. Do better.'
        gameOver = true
    }
}