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


