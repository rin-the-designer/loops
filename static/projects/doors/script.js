const infoButton = document.querySelector(".info");
const infoContainer = document.getElementById("info-container");
const infoIcon = document.getElementById("info-icon");
const startModal = document.getElementById("start-modal");
const enterButton = document.getElementById("enter-button");
const backgroundMusic = document.getElementById("background-music");

infoButton.onclick = () => {
  if (infoButton.textContent === "ⓘ") {
    infoButton.textContent = "ⓧ";
    infoContainer.style.display = "block";
    infoIcon.classList.add("active");
  } else {
    infoButton.textContent = "ⓘ";
    infoContainer.style.display = "none";
    infoIcon.classList.remove("active");
  }
};

function startExperience() {
  // play audio
  backgroundMusic.play();
  // start p5 sketch
  isSketchStarted = true;
  // hide modal
  startModal.style.display = "none";
}

enterButton.addEventListener("click", startExperience);
