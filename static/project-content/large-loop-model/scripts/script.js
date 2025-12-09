// Configuration and Supabase client (loaded from serverless function)
let config = null;
let supabase = null;

// State
let currentVersion = 0;
let currentLocation = "Loading...";
let isGenerating = false;

// Diversity arrays for variety
const philosophicalAngles = [
  "Camus - focus on the absurd and finding joy in repetition",
  "Sartre - focus on bad faith, authenticity, and self-deception",
  "Nietzsche - focus on eternal return and will to power",
  "Heidegger - focus on being and the everyday-ness of existence",
  "Simone de Beauvoir - focus on freedom within constraint",
];

const contexts = [
  "at work",
  "at home alone",
  "in public spaces",
  "with technology",
  "in nature",
  "with other people",
  "during a commute",
  "in a waiting room",
  "at a grocery store",
  "doing household chores",
  "on social media",
  "in a conversation",
  "while eating alone",
  "getting ready in the morning",
  "before falling asleep",
  "during a meeting",
  "at a cafe",
  "in a parking lot",
  "watching TV",
  "doing paperwork",
  "in an elevator",
  "at the gym",
  "walking down the street",
  "sitting in silence",
  "organizing belongings",
  "making a phone call",
  "looking in the mirror",
  "waiting for someone",
  "during a mundane task",
  "in a moment of boredom",
  "in a lecture",
  "on the subway",
];

// DOM Elements
const generatedTextEl = document.getElementById("generated-text");
const previousTextEl = document.getElementById("previous-text");
const dateTimeEl = document.getElementById("date-time");
const locationEl = document.getElementById("location");
const versionEl = document.getElementById("version");
const historyIcon = document.getElementById("history-icon");
const mainPage = document.getElementById("main-page");
const historyPage = document.getElementById("history-page");
const closeHistoryBtn = document.getElementById("close-history");
const historyList = document.getElementById("history-list");

// Initialize
init();

async function init() {
  try {
    // Load configuration from API
    config = await window.loadConfig();

    // Initialize Supabase client with loaded config
    supabase = window.supabase.createClient(
      config.supabase.url,
      config.supabase.anonKey
    );

    // Start app
    updateDateTime();
    setInterval(updateDateTime, 1000);
    await getLocation();
    await loadLatestVersion();
    await loadLastGeneratedText();

    // Event listeners
    document.addEventListener("keydown", handleKeyPress);
    historyIcon.addEventListener("click", showHistory);
    closeHistoryBtn.addEventListener("click", hideHistory);
  } catch (error) {
    console.error("Failed to initialize app:", error);
    generatedTextEl.textContent =
      "Failed to load configuration. Check console for details.";
  }
}

// Update date and time
function updateDateTime() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = now.toLocaleString("en", { month: "short" });
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  dateTimeEl.textContent = `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
}

// Get user location
async function getLocation() {
  try {
    // Try to get location from IP geolocation API
    const response = await fetch("https://ipapi.co/json/");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    currentLocation = `${data.city}, ${data.country_name}`;
    locationEl.textContent = currentLocation;
  } catch (error) {
    // Fallback to a default location if API fails (rate limit, CORS, etc)
    console.warn("Location API failed, using fallback:", error.message);
    currentLocation = "New York, USA";
    locationEl.textContent = currentLocation;
  }
}

// Load latest version number from Supabase
async function loadLatestVersion() {
  try {
    const { data, error } = await supabase
      .from("absurdity_texts")
      .select("version_number")
      .order("version_number", { ascending: false })
      .limit(1);

    if (error) throw error;

    if (data && data.length > 0) {
      currentVersion = data[0].version_number;
    } else {
      currentVersion = 0;
    }

    updateVersionDisplay();
  } catch (error) {
    console.error("Error loading version:", error);
    currentVersion = 0;
    updateVersionDisplay();
  }
}

// Load last generated text from Supabase
async function loadLastGeneratedText() {
  try {
    const { data, error } = await supabase
      .from("absurdity_texts")
      .select("generated_text")
      .order("timestamp", { ascending: false })
      .limit(1);

    if (error) throw error;

    if (data && data.length > 0 && data[0].generated_text) {
      previousTextEl.textContent = data[0].generated_text;
      previousTextEl.classList.remove("hidden");
    } else {
      // Keep hidden if no data
      previousTextEl.classList.add("hidden");
    }
  } catch (error) {
    console.error("Error loading last generated text:", error);
    previousTextEl.classList.add("hidden");
  }
}

// Update version display
function updateVersionDisplay() {
  versionEl.textContent = `v${String(currentVersion).padStart(4, "0")}`;
}

// Handle key press
function handleKeyPress(e) {
  if (e.key === "Enter" && !isGenerating) {
    generateText();
  }
}

// Generate text with GPT API (direct call)
async function generateText() {
  if (isGenerating) return;

  isGenerating = true;

  // Hide previous text during generation
  previousTextEl.classList.add("hidden");

  generatedTextEl.textContent = "";
  generatedTextEl.classList.add("typing-cursor");

  try {
    // Randomly select philosophical angle and context for variety
    const angle =
      philosophicalAngles[
        Math.floor(Math.random() * philosophicalAngles.length)
      ];
    const context = contexts[Math.floor(Math.random() * contexts.length)];

    const response = await fetch(config.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        context: context,
        angle: angle,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to generate text");
    }

    const data = await response.json();
    const generatedText = data.text;

    // Display with typing animation
    await typeText(generatedText);

    // Increment version
    currentVersion++;
    updateVersionDisplay();

    // Save to Supabase
    await saveToSupabase(generatedText);

    // Wait 30 seconds, then transition to idle state
    setTimeout(() => {
      // Dim current text to 0.6 opacity
      generatedTextEl.classList.add("dimmed");

      // Wait for transition, then move to previous
      setTimeout(() => {
        const currentText = generatedTextEl.textContent;
        if (currentText && currentText !== "Press Enter to generate") {
          previousTextEl.textContent = currentText;
          previousTextEl.classList.remove("hidden");
        }

        // Show prompt again
        generatedTextEl.textContent = "Press Enter to generate";
        generatedTextEl.classList.remove("dimmed");
      }, 1000); // Wait for opacity transition
    }, 30000); // 30 seconds
  } catch (error) {
    console.error("Error generating text:", error);
    generatedTextEl.textContent =
      "Error generating text. Please check your API key and try again.";
    // Show previous text again on error
    previousTextEl.classList.remove("hidden");
  } finally {
    generatedTextEl.classList.remove("typing-cursor");
    isGenerating = false;
  }
}

// Type text with animation
async function typeText(text) {
  generatedTextEl.textContent = "";

  for (let i = 0; i < text.length; i++) {
    generatedTextEl.textContent += text[i];
    await new Promise((resolve) => setTimeout(resolve, 20)); // 20ms per character
  }
}

// Save to Supabase
async function saveToSupabase(text) {
  try {
    const { error } = await supabase.from("absurdity_texts").insert([
      {
        version_number: currentVersion,
        timestamp: new Date().toISOString(),
        location: currentLocation,
        generated_text: text,
      },
    ]);

    if (error) throw error;

    console.log("Saved to Supabase successfully");
  } catch (error) {
    console.error("Error saving to Supabase:", error);
  }
}

// Show history page
async function showHistory() {
  historyPage.classList.remove("hidden");
  await loadHistory();
}

// Hide history page
function hideHistory() {
  historyPage.classList.add("hidden");
}

// Load history from Supabase
async function loadHistory() {
  historyList.innerHTML = '<p class="loading">Loading history...</p>';

  try {
    const { data, error } = await supabase
      .from("absurdity_texts")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      displayHistory(data);
    } else {
      historyList.innerHTML =
        '<p class="loading">No history yet. Press Enter to generate your first text.</p>';
    }
  } catch (error) {
    console.error("Error loading history:", error);
    historyList.innerHTML = '<p class="loading">Error loading history.</p>';
  }
}

// Display history items
function displayHistory(items) {
  historyList.innerHTML = "";

  items.forEach((item) => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";

    const timestamp = new Date(item.timestamp);
    const day = String(timestamp.getDate()).padStart(2, "0");
    const month = timestamp.toLocaleString("en", { month: "short" });
    const year = timestamp.getFullYear();
    const hours = String(timestamp.getHours()).padStart(2, "0");
    const minutes = String(timestamp.getMinutes()).padStart(2, "0");
    const seconds = String(timestamp.getSeconds()).padStart(2, "0");
    const formattedDateTime = `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;

    historyItem.innerHTML = `
            <div class="history-item-header">
                <span>${formattedDateTime}</span>
                <span>${item.location}</span>
            </div>
            <div class="history-item-text">${item.generated_text}</div>
            <div class="history-item-version">v${String(
              item.version_number
            ).padStart(4, "0")}</div>
        `;

    historyList.appendChild(historyItem);
  });
}
