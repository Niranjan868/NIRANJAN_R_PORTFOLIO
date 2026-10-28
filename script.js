/* ==========================================================
   EDIT THIS SECTION
   ========================================================== */

// Your GitHub profile address, e.g. "https://github.com/your-username".
// Leave empty and the GitHub button stays hidden.
const GITHUB_URL = "https://github.com/Niranjan868";

// Where contact form messages are sent.
const CONTACT_EMAIL = "niranjan1212@gmail.com";

// Add your projects here. Each one appears in the Projects section.
// Example (remove the // to use it):
// {
//   title: "Project name",
//   description: "One or two sentences about what it does.",
//   tech: ["Python"],
//   link: "https://github.com/your-username/repo",   // optional
//   demo: ""                                          // optional
// },
const PROJECTS = [
];

/* ==========================================================
   Code below does not need editing
   ========================================================== */

(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  // Photo fallback: show initials if images/photo.jpg is missing
  const photo = document.querySelector(".photo");
  const img = photo.querySelector("img");
  const showFallback = () => photo.classList.add("no-photo");
  img.addEventListener("error", showFallback);
  if (img.complete && img.naturalWidth === 0) showFallback();

  // GitHub link
  const gh = document.getElementById("github-link");
  if (GITHUB_URL && /^https?:\/\//i.test(GITHUB_URL)) {
    gh.href = GITHUB_URL;
    gh.hidden = false;
  }

  // Projects
  const list = document.getElementById("project-list");
  const el = (tag, text, cls) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (cls) node.className = cls;
    return node;
  };

  if (PROJECTS.length === 0) {
    const empty = el("div", "", "empty");
    empty.appendChild(el("p", "No projects added yet."));
    empty.appendChild(el("p", "To add one, edit the PROJECTS list at the top of script.js."));
    list.appendChild(empty);
  } else {
    PROJECTS.forEach((p) => {
      const item = el("article", "", "project");
      item.appendChild(el("h3", p.title));
      if (p.description) item.appendChild(el("p", p.description));
      if (p.tech && p.tech.length) item.appendChild(el("p", p.tech.join(", "), "tags"));
      const links = el("p", "", "links");
      [["Code", p.link], ["Live demo", p.demo]].forEach(([label, url]) => {
        if (url && /^https?:\/\//i.test(url)) {
          const a = el("a", label);
          a.href = url;
          a.target = "_blank";
          a.rel = "noopener";
          links.appendChild(a);
        }
      });
      if (links.childNodes.length) item.appendChild(links);
      list.appendChild(item);
    });
  }

  // Contact form: validates, then opens the visitor's email app with the message filled in
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  document.getElementById("email-link").href = "mailto:" + CONTACT_EMAIL;

  const rules = {
    name: (v) => (v.trim() ? "" : "Enter your name."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Enter a valid email address."),
    message: (v) => (v.trim().length >= 10 ? "" : "Write a message of at least 10 characters.")
  };

  function check(field) {
    const input = form.elements[field];
    const msg = rules[field](input.value);
    input.closest(".field").classList.toggle("invalid", !!msg);
    form.querySelector('.error[data-for="' + field + '"]').textContent = msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  }

  Object.keys(rules).forEach((f) => {
    form.elements[f].addEventListener("blur", () => check(f));
    form.elements[f].addEventListener("input", () => {
      if (form.elements[f].closest(".field").classList.contains("invalid")) check(f);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";
    const results = Object.keys(rules).map(check);
    if (results.includes(false)) {
      status.textContent = "Fix the highlighted fields and try again.";
      const firstBad = Object.keys(rules).find((f) => form.elements[f].getAttribute("aria-invalid") === "true");
      if (firstBad) form.elements[firstBad].focus();
      return;
    }
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const subject = "Portfolio message from " + name;
    const body = message + "\n\n" + name + "\n" + email;
    window.location.href =
      "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    status.textContent = "Your email app should open with the message ready. If it doesn't, write to " + CONTACT_EMAIL + ".";
  });
})();
