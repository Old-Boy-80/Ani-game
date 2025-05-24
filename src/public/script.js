const startButton = document.getElementById('start-game');
const howToPlayButton = document.getElementById('how-to-play');
const closeButton = document.getElementById('close-btn');
const instruction = document.getElementById('instruction');

 
howToPlayButton.addEventListener('click', ()=> {
    instruction.classList.remove("opacity-0", "scale-0", "-z-10");
    instruction.classList.add("opacity-100", "z-10", "scale-1");

})

closeButton.addEventListener('click', () => {
    instruction.classList.add("opacity-0", "scale-0", "-z-10");
    instruction.classList.remove("opacity-100", "z-10", "scale-1");
})