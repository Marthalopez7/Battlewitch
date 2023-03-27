//custom cursor
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

// roatates the witches in the option container to 90 then back to 0 then 90
let angle = 0
function rotate() {
    const rotateWitch = Array.from(optionsContainer.children)
    angle = angle === 0 ? 90 : 0
    rotateWitch.forEach(rotateWitch => rotateWitch.style.transform = `rotate(${angle}deg)`)
}

rotateButton.addEventListener('click', rotate)


// buildboards function
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

// creating potions
// class Potion {
//     constructor(name, length) {
//         this.name = name
//         this.length = length
//     }
// }

// const shield = new Potion ('shield', 1)

// creating witches and cauldron
class Witch {
    constructor(name, length) {
        this.name = name
        this.length = length
    }
}

const cauldron = new Witch('caul', 1)
const youngWitch = new Witch('young', 2)
const adultWitch = new Witch('adult', 3)
const elderWitch = new Witch('elder', 4)
const catWitch = new Witch('catOpt', 5)

const allWitchCharacters = [cauldron, elderWitch, youngWitch, adultWitch, catWitch]
let notDropped

// add witch characters to board randomly 
function addWitch(user, witch, startId) {
    const allGridSquares = document.querySelectorAll(`#${user} div`)
    let randomBoolean = Math.random() < 0.5
    let isHorizontal = user === 'player' ? angle === 0 : randomBoolean
    let randomStartIndex = Math.floor(Math.random() * width * width)
    
    let startIndex = startId ? startId : randomStartIndex

    // set border so ships stay in grid when they load, starting with horizontal
    let validStart =  isHorizontal ? startIndex <= width * width - witch.length ? startIndex : 
    width * width - witch.length :
    // vertical
    startIndex <= width * width - width * witch.length ? startIndex : 
    startIndex - witch.length * width + width

    let witchSpaces = []
   
    for (let i = 0; i < witch.length; i++) {
      if (isHorizontal) {
        witchSpaces.push(allGridSquares[Number(validStart) + i])
      } else {
        witchSpaces.push(allGridSquares[Number(validStart) + i * width])
      }

    }

     let valid

    if (isHorizontal) {
        witchSpaces.every((_witchSpace, index) => 
        valid = witchSpaces[0].id % width !== width - (witchSpaces.length - (index + 1)))
    } else {
        witchSpaces.every((_witchSpace, index) => 
        valid = witchSpaces[0].id < 90 + (width * index + 1)
        )
    }

    const notTaken = witchSpaces.every(witchSpace => !witchSpace.classList.contains('taken'))

        if (valid && notTaken) {
            witchSpaces.forEach(witchSpace => {
                witchSpace.classList.add(witch.name)
                witchSpace.classList.add('taken')
            }) 
        } else {
            if (user === 'computer') addWitch('computer', witch, startId);
            if (user === 'player') notDropped = true
        }
     
}
allWitchCharacters.forEach(witch => addWitch('computer', witch))



// drag player witches onto the board validly
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
    const witch = allWitchCharacters[draggedWitch.id]
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
        const allGridSquares = document.querySelectorAll("#computer div")
        allGridSquares.forEach(block => block.addEventListener('click', handleClick))
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
const playerDeadWitch = []
const opponentDeadWitch = []

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
            checkWitches('player', playerHits, playerDeadWitch)
        }
        if (!e.target.classList.contains('taken')) {
            infoDisplay.textContent = 'Miss!'
            e.target.classList.add('nothing')
            let classes = Array.from(e.target.classList)
           classes = classes.filter(className => className !== 'nothing')
        }
        playerTurn = false
        const allGridSquares = document.querySelectorAll('#computer div')
        allGridSquares.forEach(block => block.replaceWith(block.cloneNode(true)))
        setTimeout(opponetsturn, 2000)
    }
}

let isTurnSkipped = false;

function skipped() {
    isTurnSkipped= true
}

// runs computer turn (gives it two turns to try )
function opponetsturn() {
    if (!gameOver) {
        turnDisplay.textContent = "Opponent's turn..."
        infoDisplay.textContent = "Opponent launching potion..."
        setTimeout(() => {
            let randomturn = Math.floor(Math.random() * width * width)
            const allGridSquares = document.querySelectorAll('#player div')

            if( allGridSquares[randomturn].classList.contains('taken') &&
                !allGridSquares[randomturn].classList.contains('hit')
            ) {
                opponetsturn()
                return
            } else if (
                allGridSquares[randomturn].classList.contains('taken') &&
                !allGridSquares[randomturn].classList.contains('hit')
            ) {
                allGridSquares[randomturn].classList.add('hit')
                infoDisplay.textContent = "Opponet hit a witch!"
                let classes = Array.from(allGridSquares[randomturn].classList)
                classes = classes.filter(className => className !== 'block')
                classes = classes.filter(className => className !== 'hit')
                classes = classes.filter(className => className !== 'taken')
                computerHits.push(...classes)
                checkWitches('computer', computerHits, opponentDeadWitch)
            } else  {
                infoDisplay.textContent ='Miss!'
                allGridSquares[randomturn].classList.add('nothing')
            }          
        }, 2000)
        setTimeout(() => {
            playerTurn = true
            turnDisplay.textContent ='Your turn!'
            infoDisplay.textContent = 'launch a potion!'
            const allGridSquares = document.querySelectorAll('#computer div')
            allGridSquares.forEach(block => block.addEventListener('click', handleClick))
        }, 4000)
    }
}

// checks the number of witches hit from the playerHits and computerHits 
function checkWitches(user, userHits, userDeadWitch) {

    function checkWitchType(witchName, witchLength) {
        if (
            userHits.filter(storedWitchName => storedWitchName === witchName).length === witchLength
        ) {
           if (user === 'player') {
                infoDisplay.textContent =`You revealed your opponent's ${witchName}`
                playerHits = userHits.filter(storedWitchName => storedWitchName !== witchName)
            }
            if (user === 'computer') {
                    infoDisplay.textContent =`Your opponent hit your ${witchName}`
                    computerHits = userHits.filter(storedWitchName => storedWitchName !== witchName)
            }
            userDeadWitch.push(witchName) 
        }    
    }

    checkWitchType('caul', 1)
    checkWitchType('young', 2)
    checkWitchType('adult', 3)
    checkWitchType('elder', 4)
    checkWitchType('catOpt', 5)
}
    

    console.log("playerHits", playerHits)
    console.log("playerDeadWitch", playerDeadWitch)

    if (playerDeadWitch.length === 5) {
        infoDisplay.textContent = 'All enemy witches revealed, you win!'
        gameOver = true
    }
    if(opponentDeadWitch.length === 5) {
        infoDisplay.textContent = 'All your witches have been revealed, you lose. Do better.'
        gameOver = true
    }

// game not stopping
