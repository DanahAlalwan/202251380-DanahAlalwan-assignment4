
// ===============================
// Theme Toggle + Saved Preference
// ===============================
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }
}

function toggleTheme() {
  body.classList.toggle("dark-mode");
  const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);
}

themeToggle.addEventListener("click", toggleTheme);

// ===============================
// Mobile Navigation
// ===============================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// ===============================
// Typing Effect
// ===============================
const typingText = document.getElementById("typingText");
const phrases = [
  "I build clean, responsive, and user-friendly web applications.",
  "I enjoy combining design, logic, and usability in one project.",
  "This portfolio showcases my projects, skills, and growth."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  const displayedText = currentPhrase.substring(0, charIndex);
  typingText.textContent = displayedText;

  if (!isDeleting && charIndex < currentPhrase.length) {
    charIndex++;
    setTimeout(typeEffect, 45);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 25);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(typeEffect, 900);
  }
}

// ===============================
// Scroll Progress Bar
// ===============================
const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress);

// ===============================
// Project Filtering + Sorting + Search
// ===============================
const categoryFilter = document.getElementById("categoryFilter");
const sortProjects = document.getElementById("sortProjects");
const searchInput = document.getElementById("searchInput");
const projectsContainer = document.getElementById("projects-container");
const noResultsMessage = document.getElementById("noResultsMessage");

const originalProjectCards = Array.from(document.querySelectorAll(".project-card"));

function updateProjects() {
  const selectedCategory = categoryFilter.value;
  const selectedSort = sortProjects.value;
  const searchText = searchInput.value.trim().toLowerCase();

  let filteredProjects = originalProjectCards.filter((card) => {
    const category = card.dataset.category.toLowerCase();
    const title = card.dataset.title.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();

    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;
    const matchesSearch =
      title.includes(searchText) || description.includes(searchText);

    return matchesCategory && matchesSearch;
  });

  if (selectedSort === "title") {
    filteredProjects.sort((a, b) =>
      a.dataset.title.localeCompare(b.dataset.title)
    );
  } else if (selectedSort === "date-new") {
    filteredProjects.sort(
      (a, b) => new Date(b.dataset.date) - new Date(a.dataset.date)
    );
  } else if (selectedSort === "date-old") {
    filteredProjects.sort(
      (a, b) => new Date(a.dataset.date) - new Date(b.dataset.date)
    );
  } else {
    filteredProjects = [...filteredProjects].sort(
      (a, b) => originalProjectCards.indexOf(a) - originalProjectCards.indexOf(b)
    );
  }

  projectsContainer.innerHTML = "";

  if (filteredProjects.length === 0) {
    noResultsMessage.textContent = "No matching projects found.";
    noResultsMessage.className = "message error-message empty-state";
    return;
  }

  noResultsMessage.textContent = "";
  noResultsMessage.className = "message empty-state";

  filteredProjects.forEach((card) => projectsContainer.appendChild(card));
}

categoryFilter.addEventListener("change", updateProjects);
sortProjects.addEventListener("change", updateProjects);
searchInput.addEventListener("input", updateProjects);

// ===============================
// Project Modal
// ===============================
const projectModal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const projectDetails = {
  "Portfolio Website":
    "A complete personal web application with responsive design, dark mode, GitHub API integration, localStorage personalization, and documentation.",
  "Task Manager":
    "A JavaScript project focused on dynamic DOM updates, user interactions, and organizing task workflows effectively.",
  "Student Cards App":
    "A React-based project that demonstrates reusable components, props usage, and rendering data using array mapping.",
  StockMind:
    "A concept-driven platform for beginner-friendly stock analysis and investment simulation with a simple interface."
};

function attachProjectButtons() {
  const detailsButtons = document.querySelectorAll(".details-btn");

  detailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".project-card");
      const title = card.dataset.title;

      modalTitle.textContent = title;
      modalDescription.textContent =
        projectDetails[title] || "More details will be added soon.";

      projectModal.classList.remove("hidden");
    });
  });
}

closeModal.addEventListener("click", () => {
  projectModal.classList.add("hidden");
});

projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    projectModal.classList.add("hidden");
  }
});

// ===============================
// GitHub API Integration
// ===============================
async function fetchGitHubRepos() {
  const repoContainer = document.getElementById("repo-container");
  const repoMessage = document.getElementById("repo-message");

  repoMessage.textContent = "Loading repositories...";
  repoMessage.className = "message";

  try {
    const response = await fetch("https://api.github.com/users/DanahAlalwan/repos");

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repositories.");
    }

    const repos = await response.json();

    const filteredRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 6);

    repoContainer.innerHTML = "";

    if (filteredRepos.length === 0) {
      repoMessage.textContent = "No repositories found.";
      repoMessage.className = "message error-message";
      return;
    }

    filteredRepos.forEach((repo) => {
      const repoCard = document.createElement("article");
      repoCard.className = "repo-card";
      repoCard.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description available."}</p>
        <p><strong>Language:</strong> ${repo.language || "Not specified"}</p>
        <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View Repository</a>
      `;
      repoContainer.appendChild(repoCard);
    });

    repoMessage.textContent = "";
  } catch (error) {
    repoMessage.textContent =
      "Unable to load GitHub repositories right now. Please try again later.";
    repoMessage.className = "message error-message";
    console.error("GitHub API error:", error);
  }
}

// ===============================
// Visitor Name State Management
// ===============================
const visitorNameInput = document.getElementById("visitorName");
const saveNameBtn = document.getElementById("saveNameBtn");
const clearNameBtn = document.getElementById("clearNameBtn");
const welcomeMessage = document.getElementById("welcomeMessage");

function loadVisitorName() {
  const savedName = localStorage.getItem("visitorName");

  if (savedName) {
    welcomeMessage.textContent = `Welcome back, ${savedName}!`;
    welcomeMessage.className = "message success-message";
  } else {
    welcomeMessage.textContent = "No name saved yet.";
    welcomeMessage.className = "message";
  }
}

function saveVisitorName() {
  const name = visitorNameInput.value.trim();

  if (!name) {
    welcomeMessage.textContent = "Please enter a valid name.";
    welcomeMessage.className = "message error-message";
    return;
  }

  localStorage.setItem("visitorName", name);
  welcomeMessage.textContent = `Welcome, ${name}! Your name has been saved.`;
  welcomeMessage.className = "message success-message";
  visitorNameInput.value = "";
}

function clearVisitorName() {
  localStorage.removeItem("visitorName");
  welcomeMessage.textContent = "Saved name cleared.";
  welcomeMessage.className = "message";
}

saveNameBtn.addEventListener("click", saveVisitorName);
clearNameBtn.addEventListener("click", clearVisitorName);

// ===============================
// Contact Form Validation
// ===============================
const contactForm = document.getElementById("contactForm");
const feedback = document.getElementById("form-feedback");

function validateContactForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !subject || !message) {
    feedback.textContent = "Please fill in all fields.";
    feedback.className = "message error-message";
    return;
  }

  if (!emailPattern.test(email)) {
    feedback.textContent = "Please enter a valid email address.";
    feedback.className = "message error-message";
    return;
  }

  if (subject.length < 3) {
    feedback.textContent = "Subject must be at least 3 characters long.";
    feedback.className = "message error-message";
    return;
  }

  if (message.length < 10) {
    feedback.textContent = "Message must be at least 10 characters long.";
    feedback.className = "message error-message";
    return;
  }

  feedback.textContent = "Form submitted successfully!";
  feedback.className = "message success-message";
  contactForm.reset();
}

contactForm.addEventListener("submit", validateContactForm);

// ===============================
// Initialize Page
// ===============================
loadTheme();
updateProjects();
fetchGitHubRepos();
loadVisitorName();
attachProjectButtons();
typeEffect();
updateScrollProgress();