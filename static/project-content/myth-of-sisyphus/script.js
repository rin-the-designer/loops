const infoButton = document.querySelector(".info");
const infoContainer = document.getElementById("info-container");
const infoIcon = document.getElementById("info-icon");

infoButton.onclick = () => {
  if (infoButton.textContent === "ⓘ") {
    infoButton.textContent = "ⓧ";
    infoContainer.style.display = "flex";
    infoIcon.classList.add("active");
  } else {
    infoButton.textContent = "ⓘ";
    infoContainer.style.display = "none";
    infoIcon.classList.remove("active");
  }
};

document.getElementById("requestCamera").addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    // Handle the stream (you might want to call your existing video setup function here)
    console.log("Camera access granted");
  } catch (err) {
    console.error("Error accessing camera:", err);
  }
});
