const startButton = document.getElementById("start-game");
const howToPlayButton = document.getElementById("how-to-play");
const closeButton = document.getElementById("close-btn");
const instruction = document.getElementById("instruction");
const game = document.getElementById("game");
const description = document.getElementById("description");

howToPlayButton.addEventListener("click", () => {
  instruction.classList.remove("opacity-0", "scale-0", "-z-10");
  instruction.classList.add("opacity-100", "z-10", "scale-1");
});

closeButton.addEventListener("click", () => {
  instruction.classList.add("opacity-0", "scale-0", "-z-10");
  instruction.classList.remove("opacity-100", "z-10", "scale-1");
});

startButton.addEventListener("click", () => {
  description.classList.toggle("hidden");
  game.classList.remove("opacity-0", "scale-0", "h-0");
  game.classList.add("opacity-100", "scale-1");
});

// Game Logic Here
let score =
  parseInt(new URLSearchParams(window.location.search).get("score")) || 0;
let level =
  parseInt(new URLSearchParams(window.location.search).get("level")) || 1;
const MAX_LEVEL = 10;
const voterButton = document.querySelectorAll(".voter");

function getAnimeFavorites() {
  const secrets = document.querySelectorAll(".secret");
  return Array.from(secrets).map((s) => parseInt(s.textContent));
}

voterButton.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const [fav1, fav2] = getAnimeFavorites();
    const selected = idx === 0 ? fav1 : fav2;
    const correct = selected >= Math.max(fav1, fav2);
    const parentCard = btn.closest(".max-w-sm");
    updateUI(correct, parentCard);
  });
});

function updateUI(isCorrect, parentCard) {
  const resultMsg = document.createElement("p");
  resultMsg.textContent = isCorrect ? "Correct!" : "Wrong!";
  resultMsg.className = "text-center text-lg font-bold my-4 text-[#03e9f4]";
  parentCard.appendChild(resultMsg);

  parentCard.classList.add(
    isCorrect ? "border-green-500" : "border-red-500",
    "border-2"
  );
  level++;
  if (isCorrect) score++;
  document.getElementById("scoreRound").textContent = score;
  document.getElementById("levelRound").textContent = `${level}/${MAX_LEVEL}`;

  const percent = (level / MAX_LEVEL) * 100;
  document.getElementById("progressBar").style.width = `${percent}%`;

  document.querySelectorAll(".voter").forEach((b) => (b.disabled = true));

  setTimeout(() => {
    if (level >= MAX_LEVEL) {
    //   alert(`Game Over! Final Score: ${score}/${MAX_LEVEL}`);
      window.location.href = `/game-over?score=${score}`;
    } else {
        loadNewRound();
    //   window.location.href = `/?score=${score}&level=${level}`;
    }
  }, 1000);
}


async function loadNewRound() {
  const res = await fetch("/api/anime-pair");
  const data = await res.json();
  
  const gameContainer = document.getElementById("game-cards");
  gameContainer.innerHTML = generateGameHTML(data.ResO, data.ResT);
  
  attachVoteHandlers()
}


function generateGameHTML(ResO, ResT) {
  return `
  <div id="game-cards" class="flex gap-6 justify-around items-center mt-12">
    <!-- Card One -->
    <div
      class="max-w-sm w-full bg-[#0a0b10] rounded-lg shadow-lg overflow-hidden"
    >
      <img
        class="w-full h-48 object-contain object-center rounded-t"
        src=" ${ResO.data.images.jpg.image_url}"
        alt="Anime Cover"
      />
      <div class="p-6">
        <h3 class="hidden secret"> ${ResO.data.favorites}</h3>
        <h2 class="text-2xl font-bold text-[#03e9f4] mb-2">
           ${ResO.data.title} 
        </h2>
        <p class="text-gray-300 text-sm mb-4">
          <span class="font-semibold">Genre:</span>  ${ResO.data.genres &&
          ResO.data.genres.length > 0 ? ResO.data.genres.map(n =>
          n.name).join(","): '-'} <br />
          <!-- <span class="font-semibold">Episodes:</span> 75<br> -->
          <span class="font-semibold">Studio:</span>  ${ResO.data.studios &&
          ResO.data.studios.length > 0 ? ResO.data.studios.map(n =>
          n.name).join(",") : '-'} <br />
          <span class="font-semibold">Release Year:</span>  ${new
          Date(ResO.data.aired.from).getFullYear()} 
        </p>
        <div class="flex items-center mb-4">
          <span class="text-gray-400 text-lg">Ratings: </span>
          <span class="ml-2 text-yellow-400 text-sm"
            > ${ResO.data.score ? ResO.data.score: '-'} </span
          >
        </div>
        <button
          class="voter w-full text-[#03e9f4] border border-gray-100/30 font-semibold py-2 px-4 rounded hover:bg-pink-400/30 transition duration-200"
        >
          Vote Now
        </button>
      </div>
    </div>

    <!-- Versus -->
    <div class="absolute">
      <h1
        class="font-extrabold text-[#03e9f4] text-4xl border-2 border-[#03e9f4] animate-glow p-4 bg-[#0a0b10]"
      >
        VS
      </h1>
    </div>

    <!-- Card Two -->
    <div
      class="max-w-sm w-full bg-[#0a0b10] rounded-lg shadow-lg overflow-hidden"
    >
      <img
        class="w-full h-48 object-contain"
        src=" ${ResT.data.images.jpg.image_url} "
        alt="Anime Cover"
      />
      <div class="p-6">
        <h3 class="hidden secret">${ResT.data.favorites}</h3>
        <h2 class="text-2xl font-bold text-[#03e9f4] mb-2">
           ${ResT.data.title} 
        </h2>
        <p class="text-gray-300 text-sm mb-4">
          <span class="font-semibold">Genre:</span>  ${ResT.data.genres &&
          ResT.data.genres.length > 0 ? ResT.data.genres.map(n =>
          n.name).join(","): '-'} <br />
          <!-- <span class="font-semibold">Episodes:</span> 75<br> -->
          <span class="font-semibold">Studio:</span>  ${ResT.data.studios &&
          ResT.data.studios.length > 0 ? ResT.data.studios.map(n =>
          n.name).join(",") : '-'} <br />
          <span class="font-semibold">Release Year:</span>  ${new
          Date(ResT.data.aired.from).getFullYear()} 
        </p>
        <div class="flex items-center mb-4">
          <span class="text-gray-400 text-lg">Ratings: </span>
          <span class="ml-2 text-yellow-400 text-sm"
            > ${ResT.data.score ? ResT.data.score: '-' }</span
          >
        </div>
        <button
          class="voter w-full text-[#03e9f4] border border-gray-100/30 font-semibold py-2 px-4 rounded hover:bg-pink-400/30 transition duration-200"
        >
          Vote Now
        </button>
      </div>
    </div>
  </div>
  `;
}


function attachVoteHandlers() {
  const voterButtons = document.querySelectorAll(".voter");
  
  voterButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      const [fav1, fav2] = getAnimeFavorites();
      const selected = idx === 0 ? fav1 : fav2;
      const correct = selected >= Math.max(fav1, fav2);
      const parentCard = btn.closest(".max-w-sm");

      updateUI(correct, parentCard);
    });
  });
}
