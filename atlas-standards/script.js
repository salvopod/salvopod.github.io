const maps = {
  simulation: {
    title: 'A map for simulations',
    description: 'Start with the decisions learners need to practise, then consider psychological safety, useful consequences and a debrief that connects the experience to work.',
    guidance: ['Decisions and observable behaviours', 'Realistic consequences', 'Feedback and structured reflection']
  },
  video: {
    title: 'A map for video',
    description: 'Begin with the moment video can explain or demonstrate better than another format, then make the message easy to follow, revisit and use.',
    guidance: ['One clear purpose', 'Accessible audio and captions', 'A practical next action']
  },
  session: {
    title: 'A map for facilitated sessions',
    description: 'Design around what people will discuss, practise and decide together. Give the facilitator enough structure without scripting every human moment.',
    guidance: ['Participation and inclusion', 'Practice with useful feedback', 'Facilitator guidance and flexibility']
  },
  support: {
    title: 'A map for performance support',
    description: 'Place the guidance as close as possible to the moment of need. Reduce the content to the decisions, prompts and actions someone must complete.',
    guidance: ['Available at the point of work', 'Short and scannable', 'Easy to maintain and update']
  }
};

const title = document.querySelector('#map-title');
const description = document.querySelector('#map-description');
const guidance = document.querySelector('#map-guidance');
const buttons = [...document.querySelectorAll('[data-map]')];

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const map = maps[button.dataset.map];
    buttons.forEach((item) => item.setAttribute('aria-selected', String(item === button)));
    title.textContent = map.title;
    description.textContent = map.description;
    guidance.replaceChildren(...map.guidance.map((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      return li;
    }));
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate([
        { opacity: .35, transform: 'translateY(24px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 650, easing: 'ease-out', fill: 'both' });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('[data-reveal]').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
  observer.observe(element);
});
