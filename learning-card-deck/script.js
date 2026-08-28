const content = [
  {
    kicker: "Start here",
    title: "Orientation",
    copy: "Help learners understand where they are, what they will do and why it matters before asking them to begin.",
    example: "Open with one clear outcome and show the learner how the activity is structured."
  },
  {
    kicker: "Make it matter",
    title: "Relevance",
    copy: "Connect new information to a real situation, decision or challenge the learner already recognises.",
    example: "Introduce the idea through a realistic question the learner might face at work."
  },
  {
    kicker: "Create agency",
    title: "Choice",
    copy: "Give learners meaningful control over the route, example or level of support without making the experience confusing.",
    example: "Let learners choose which example to explore first, then make every route easy to revisit."
  },
  {
    kicker: "Use the idea",
    title: "Practice",
    copy: "Move beyond explanation by asking learners to make a decision, try a skill or apply the idea in context.",
    example: "Follow each short explanation with one small action that uses the concept immediately."
  },
  {
    kicker: "Notice progress",
    title: "Reflection",
    copy: "Create a pause for learners to recognise what changed, identify uncertainty and choose what to do next.",
    example: "End with one question: what will you do differently because of what you explored?"
  }
];

const cards = [...document.querySelectorAll(".deck-card")];
const progress = document.querySelector("#progress");
const visited = new Set([0]);
let activeIndex = 0;

const fields = {
  count: document.querySelector("#detail-count"),
  visited: document.querySelector("#visited-count"),
  kicker: document.querySelector("#detail-kicker"),
  title: document.querySelector("#detail-title"),
  copy: document.querySelector("#detail-copy"),
  example: document.querySelector("#detail-example")
};

content.forEach((item, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Open card ${index + 1}: ${item.title}`);
  dot.addEventListener("click", () => selectCard(index));
  progress.append(dot);
});

const positions = [
  { x: 0, y: 0, r: 0, s: 1 },
  { x: 24, y: 19, r: 3.2, s: .965 },
  { x: -27, y: 39, r: -4.8, s: .925 },
  { x: 37, y: 57, r: 6.4, s: .885 },
  { x: -40, y: 73, r: -7.4, s: .845 }
];

function selectCard(index) {
  activeIndex = (index + cards.length) % cards.length;
  visited.add(activeIndex);
  const item = content[activeIndex];

  cards.forEach((card, cardIndex) => {
    const depth = (cardIndex - activeIndex + cards.length) % cards.length;
    const position = positions[depth];
    card.style.setProperty("--x", `${position.x}px`);
    card.style.setProperty("--y", `${position.y}px`);
    card.style.setProperty("--r", `${position.r}deg`);
    card.style.setProperty("--s", position.s);
    card.style.zIndex = String(cards.length - depth);
    card.classList.toggle("is-active", depth === 0);
    card.setAttribute("aria-pressed", String(depth === 0));
  });

  fields.count.textContent = `Card ${String(activeIndex + 1).padStart(2, "0")} of 05`;
  fields.visited.textContent = visited.size;
  fields.kicker.textContent = item.kicker;
  fields.title.textContent = item.title;
  fields.copy.textContent = item.copy;
  fields.example.textContent = item.example;

  [...progress.children].forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeIndex);
    dot.classList.toggle("is-visited", visited.has(index));
    dot.setAttribute("aria-current", index === activeIndex ? "step" : "false");
  });
}

cards.forEach((card) => card.addEventListener("click", () => selectCard(Number(card.dataset.index))));
document.querySelector("#previous-card").addEventListener("click", () => selectCard(activeIndex - 1));
document.querySelector("#next-card").addEventListener("click", () => selectCard(activeIndex + 1));
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") selectCard(activeIndex - 1);
  if (event.key === "ArrowRight") selectCard(activeIndex + 1);
});

selectCard(0);
