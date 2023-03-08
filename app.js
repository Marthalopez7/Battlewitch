// set grid 10rows x 10columns
const rows = 10;
const col = 10;

// links to the html div element
let gameboard = document.getElementById("playingBoard");

// grid 2 of each witch type 0 = nothing, 1 = witch, 2 = damaged witch, 3 = witch ded, 4 = potion, 5 = miss
let gridBoard = [
    [0,1,1,0,1,1,0,0,0,0]
    [0,0,0,0,0,0,0,0,1,0]
    [0,0,1,1,0,0,0,0,0,0]
    [0,0,1,1,0,0,0,1,0,0]
    [0,0,0,0,0,0,0,1,0,0]
    [0,0,0,1,0,0,0,1,1,0]
    [0,1,0,0,0,0,0,0,0,0]
    [0,1,0,0,0,1,1,0,0,0]
    [0,1,1,0,0,1,1,0,0,0]
    [0,0,0,0,0,0,0,0,0,0]
];



// click a sqaure to launch potion bottle
element.addEventListener('click', (e) => launchpotion(e.target)) 

function launchpotion(event){

}


// when user clicks a sqaure and it hits, the color of the sqaure changes it to red
document.addEventListener("click", hitWitch, false);

function hitWitch() {
    document.pbs.style.backgroundcolor = '#512525';
}

// document.addEventListener("click", hitWitch, true);

// function hitWitch() {
//     document.body.style.backgroundImage = 'potion';
// }

