// validation.js: checks the registration form and saves the data for the ticket page

const form = document.getElementById("regForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const github = document.getElementById("github");
const avatar = document.getElementById("avatar");

// Patterns for the email and GitHub checks
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const githubPattern = /^@[A-Za-z0-9-]{1,39}$/;

// Shows (or clears) an error message under a field
function setError(id, message) {
  document.getElementById(id).textContent = message;
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  let isValid = true;
  const file = avatar.files[0];

  // Full name: required, not just spaces
  if (fullName.value.trim() === "") {
    setError("nameError", "Please enter your full name.");
    isValid = false;
  } else {
    setError("nameError", "");
  }

  // Email: must look like user@domain.com
  if (!emailPattern.test(email.value.trim())) {
    setError("emailError", "Enter a valid email, e.g. user@domain.com.");
    isValid = false;
  } else {
    setError("emailError", "");
  }

  // GitHub: must start with @
  if (!githubPattern.test(github.value.trim())) {
    setError("githubError", "Username must start with @, e.g. @octocat.");
    isValid = false;
  } else {
    setError("githubError", "");
  }

  // Avatar: required, JPEG/PNG only, under 500KB
  if (!file) {
    setError("avatarError", "Please upload an avatar image.");
    isValid = false;
  } else if (file.type !== "image/jpeg" && file.type !== "image/png") {
    setError("avatarError", "Only JPEG or PNG images are allowed.");
    isValid = false;
  } else if (file.size > 500 * 1024) {
    setError("avatarError", "Image must be smaller than 500KB.");
    isValid = false;
  } else {
    setError("avatarError", "");
  }

  if (!isValid) {
    return; // stop here, errors are showing
  }

  // Convert the image to text so it can be stored, then save everything
  const reader = new FileReader();
  reader.onload = function () {
    const attendee = {
      name: fullName.value.trim(),
      email: email.value.trim(),
      github: github.value.trim(),
      avatar: reader.result
    };
    localStorage.setItem("attendee", JSON.stringify(attendee));
    window.location.href = "ticket.html";
  };
  reader.readAsDataURL(file);
});