const topics = {
  discover: {
    title: "See the whole picture",
    copy: "Begin with the purpose, not the detail. I’ll help you notice what matters and how each piece connects.",
    prompt: "A clear overview makes everything easier",
    idea: "Placeholder idea: start by writing the purpose in one simple sentence."
  },
  understand: {
    title: "Make meaning from it",
    copy: "Let’s turn the idea into plain language, connect it to what you already know, and explore a useful example.",
    prompt: "Understanding grows through good connections",
    idea: "Placeholder idea: connect this concept to one example you already know."
  },
  practice: {
    title: "Give it a try",
    copy: "Choose a small next step and test your understanding. Progress comes from using the idea, not just reading it.",
    prompt: "Small practice creates lasting confidence",
    idea: "Placeholder idea: choose one small action you can try in the next five minutes."
  }
};

const cards = [...document.querySelectorAll(".choice")];
const panel = document.querySelector(".content-panel");
const title = document.querySelector("#panel-title");
const copy = document.querySelector("#panel-copy");
const prompt = document.querySelector("#panel-prompt");
const mayaButton = document.querySelector(".maya-button");
const mayaIdea = document.querySelector("#maya-idea");
let selectedTopic = null;

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const topic = topics[card.dataset.topic];
    selectedTopic = topic;
    mayaIdea.textContent = topic.idea;
    cards.forEach((item) => {
      const selected = item === card;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    panel.classList.add("is-changing");
    window.setTimeout(() => {
      title.textContent = topic.title;
      copy.textContent = topic.copy;
      prompt.textContent = topic.prompt;
      panel.classList.remove("is-changing");
    }, 180);

    mayaButton.classList.remove("is-happy");
    requestAnimationFrame(() => mayaButton.classList.add("is-happy"));
  });
});

mayaButton.addEventListener("click", () => {
  const hasIdea = mayaButton.classList.toggle("has-idea");
  if (!selectedTopic) mayaIdea.textContent = "Choose a card first, then click me and I’ll share an idea for it.";
  mayaButton.setAttribute("aria-pressed", String(hasIdea));
  mayaButton.querySelector(".speech").textContent = hasIdea ? "That sparked an idea!" : "Click me for an idea";
});
