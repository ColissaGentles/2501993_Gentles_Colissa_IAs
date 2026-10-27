// ticket.js: fills the ticket from saved data, or sends visitors home if there is none

// Read the saved attendee (saved by validation.js)
const saved = localStorage.getItem("attendee");

// Guard: no data means the visitor skipped the form, so send them to the landing page
if (!saved) {
  window.location.href = "index.html";
} else {
  const attendee = JSON.parse(saved);

  // Banner message and name
  document.getElementById("congratsMsg").textContent =
    "Congrats, " + attendee.name + "! Your ticket is ready.";
  document.getElementById("ticketName").textContent = attendee.name;

  // GitHub handle and link (remove the @ for the URL)
  const githubLink = document.getElementById("ticketGithub");
  githubLink.textContent = attendee.github;
  githubLink.href = "https://github.com/" + attendee.github.slice(1);

  // Avatar image (stored as text by validation.js)
  document.getElementById("ticketAvatar").src = attendee.avatar;

  // Serial number: made once, then reused so it doesn't change on refresh
  let serial = localStorage.getItem("serial");
  if (!serial) {
    serial = "#" + String(Math.floor(Math.random() * 99999)).padStart(5, "0");
    localStorage.setItem("serial", serial);
  }
  document.getElementById("ticketSerial").textContent = serial;
}