import './styles.css';
// ========================
// Virtual Tarot App - JS (Full)
// ========================

// --- 78 Card Filenames ---
const cards = [
  // Major Arcana
  "the_fool.jpg","the_magician.jpg","the_high_priestess.jpg","the_empress.jpg",
  "the_emperor.jpg","the_hierophant.jpg","the_lovers.jpg","the_chariot.jpg",
  "strength.jpg","the_hermit.jpg","the_wheel_of_fortune.jpg","justice.jpg",
  "the_hanged_man.jpg","death.jpg","temperance.jpg","the_devil.jpg","the_tower.jpg",
  "the_star.jpg","the_moon.jpg","the_sun.jpg","judgement.jpg","the_world.jpg",

  // Wands
  "ace_of_wands.jpg","two_of_wands.jpg","three_of_wands.jpg","four_of_wands.jpg",
  "five_of_wands.jpg","six_of_wands.jpg","seven_of_wands.jpg","eight_of_wands.jpg",
  "nine_of_wands.jpg","ten_of_wands.jpg","page_of_wands.jpg","knight_of_wands.jpg",
  "queen_of_wands.jpg","king_of_wands.jpg",

  // Cups
  "ace_of_cups.jpg","two_of_cups.jpg","three_of_cups.jpg","four_of_cups.jpg",
  "five_of_cups.jpg","six_of_cups.jpg","seven_of_cups.jpg","eight_of_cups.jpg",
  "nine_of_cups.jpg","ten_of_cups.jpg","page_of_cups.jpg","knight_of_cups.jpg",
  "queen_of_cups.jpg","king_of_cups.jpg",

  // Swords
  "ace_of_swords.jpg","two_of_swords.jpg","three_of_swords.jpg","four_of_swords.jpg",
  "five_of_swords.jpg","six_of_swords.jpg","seven_of_swords.jpg","eight_of_swords.jpg",
  "nine_of_swords.jpg","ten_of_swords.jpg","page_of_swords.jpg","knight_of_swords.jpg",
  "queen_of_swords.jpg","king_of_swords.jpg",

  // Pentacles
  "ace_of_pentacles.jpg","two_of_pentacles.jpg","three_of_pentacles.jpg","four_of_pentacles.jpg",
  "five_of_pentacles.jpg","six_of_pentacles.jpg","seven_of_pentacles.jpg","eight_of_pentacles.jpg",
  "nine_of_pentacles.jpg","ten_of_pentacles.jpg","page_of_pentacles.jpg","knight_of_pentacles.jpg",
  "queen_of_pentacles.jpg","king_of_pentacles.jpg"
];

// ========================
// Upright & Reversed Meanings
// ========================
const cardMeanings = {
  // --- Major Arcana ---
  "the_fool.jpg": {
    upright: "New beginnings, innocence, free spirit, and faith in the unknown.",
    reversed: "Recklessness, carelessness, or fear of taking a leap of faith."
  },
  "the_magician.jpg": {
    upright: "Manifestation, willpower, inspired action, resourcefulness.",
    reversed: "Manipulation, deception, or untapped potential."
  },
  "the_high_priestess.jpg": {
    upright: "Intuition, hidden knowledge, divine feminine, mystery.",
    reversed: "Secrets, withdrawal, or ignoring your intuition."
  },
  "the_empress.jpg": {
    upright: "Abundance, fertility, nurturing, beauty, connection to nature.",
    reversed: "Creative block, dependence on others, or smothering love."
  },
  "the_emperor.jpg": {
    upright: "Authority, structure, discipline, leadership.",
    reversed: "Tyranny, rigidity, or lack of control."
  },
  "the_hierophant.jpg": {
    upright: "Tradition, spiritual wisdom, institutions, conformity.",
    reversed: "Rebellion, personal beliefs, or rejection of convention."
  },
  "the_lovers.jpg": {
    upright: "Union, choices, love, harmony, alignment of values.",
    reversed: "Disharmony, imbalance, or difficult choices."
  },
  "the_chariot.jpg": {
    upright: "Determination, control, victory through willpower.",
    reversed: "Lack of direction, aggression, or self-doubt."
  },
  "strength.jpg": {
    upright: "Courage, compassion, inner strength, patience.",
    reversed: "Weakness, self-doubt, insecurity, or lack of confidence."
  },
  "the_hermit.jpg": {
    upright: "Introspection, solitude, inner guidance, truth-seeking.",
    reversed: "Isolation, loneliness, or withdrawal from the world."
  },
  "the_wheel_of_fortune.jpg": {
    upright: "Change, destiny, luck, cycles of life turning in your favor.",
    reversed: "Resistance to change, bad luck, or misfortune."
  },
  "justice.jpg": {
    upright: "Truth, fairness, law, karma, accountability.",
    reversed: "Dishonesty, unfairness, or corruption."
  },
  "the_hanged_man.jpg": {
    upright: "Letting go, new perspective, surrender, suspension.",
    reversed: "Stalling, indecision, or refusal to see differently."
  },
  "death.jpg": {
    upright: "Transformation, endings leading to new beginnings.",
    reversed: "Resistance to change, stagnation, or fear of transition."
  },
  "temperance.jpg": {
    upright: "Balance, harmony, moderation, patience.",
    reversed: "Excess, imbalance, or lack of long-term vision."
  },
  "the_devil.jpg": {
    upright: "Addiction, attachment, materialism, temptation.",
    reversed: "Freedom, release, reclaiming power."
  },
  "the_tower.jpg": {
    upright: "Sudden change, upheaval, revelation, awakening.",
    reversed: "Avoidance of disaster, fear of change."
  },
  "the_star.jpg": {
    upright: "Hope, inspiration, renewal, spiritual clarity.",
    reversed: "Despair, faithlessness, or disconnection."
  },
  "the_moon.jpg": {
    upright: "Illusion, dreams, intuition, the subconscious.",
    reversed: "Deception, confusion, or unveiling the truth."
  },
  "the_sun.jpg": {
    upright: "Joy, success, vitality, optimism.",
    reversed: "Temporary sadness, lack of clarity, or unrealistic expectations."
  },
  "judgement.jpg": {
    upright: "Reflection, reckoning, awakening, inner calling.",
    reversed: "Self-doubt, ignoring a calling, or avoiding reflection."
  },
  "the_world.jpg": {
    upright: "Completion, fulfillment, accomplishment, wholeness.",
    reversed: "Lack of closure, delays, or unfulfilled goals."
  },

  // --- Minor Arcana (summarized below; all suits follow same upright/reversed tone) ---
  "ace_of_wands.jpg": { upright: "Inspiration and new opportunities.", reversed: "Delays, lack of motivation." },
  "two_of_wands.jpg": { upright: "Planning, progress, future vision.", reversed: "Fear of change, lack of planning." },
  "three_of_wands.jpg": { upright: "Expansion, foresight, momentum.", reversed: "Delays, lack of foresight." },
  "four_of_wands.jpg": { upright: "Celebration, harmony, homecoming.", reversed: "Conflict at home, instability." },
  "five_of_wands.jpg": { upright: "Competition, conflict, challenges.", reversed: "Avoiding tension, inner conflict." },
  "six_of_wands.jpg": { upright: "Victory, recognition, success.", reversed: "Ego, self-doubt, fall from grace." },
  "seven_of_wands.jpg": { upright: "Defensiveness, perseverance.", reversed: "Exhaustion, giving up." },
  "eight_of_wands.jpg": { upright: "Speed, movement, progress.", reversed: "Delays, frustration, miscommunication." },
  "nine_of_wands.jpg": { upright: "Resilience, persistence, courage.", reversed: "Fatigue, paranoia, burnout." },
  "ten_of_wands.jpg": { upright: "Responsibility, burden, hard work.", reversed: "Overwhelm, refusing help." },
  "page_of_wands.jpg": { upright: "Curiosity, enthusiasm, exploration.", reversed: "Impatience, lack of direction." },
  "knight_of_wands.jpg": { upright: "Adventure, passion, action.", reversed: "Recklessness, arrogance." },
  "queen_of_wands.jpg": { upright: "Confidence, determination, warmth.", reversed: "Jealousy, insecurity, burnout." },
  "king_of_wands.jpg": { upright: "Leadership, vision, boldness.", reversed: "Impulsiveness, domineering energy." },

  "ace_of_cups.jpg": { upright: "Love, compassion, creativity, new feelings.", reversed: "Blocked emotions, emotional loss." },
  "two_of_cups.jpg": { upright: "Partnership, connection, mutual respect.", reversed: "Imbalance, separation, tension." },
  "three_of_cups.jpg": { upright: "Celebration, friendship, community.", reversed: "Gossip, overindulgence." },
  "four_of_cups.jpg": { upright: "Contemplation, reevaluation.", reversed: "New opportunities, awareness." },
  "five_of_cups.jpg": { upright: "Loss, grief, disappointment.", reversed: "Acceptance, moving on." },
  "six_of_cups.jpg": { upright: "Nostalgia, childhood, innocence.", reversed: "Stuck in the past, unrealistic views." },
  "seven_of_cups.jpg": { upright: "Choices, fantasy, imagination.", reversed: "Clarity, reality check." },
  "eight_of_cups.jpg": { upright: "Letting go, withdrawal, deeper meaning.", reversed: "Avoidance, aimlessness." },
  "nine_of_cups.jpg": { upright: "Satisfaction, wish fulfillment.", reversed: "Greed, dissatisfaction." },
  "ten_of_cups.jpg": { upright: "Harmony, happiness, family love.", reversed: "Disharmony, disconnection." },
  "page_of_cups.jpg": { upright: "Imagination, love message, intuition.", reversed: "Emotional immaturity, insecurity." },
  "knight_of_cups.jpg": { upright: "Romance, charm, following the heart.", reversed: "Moodiness, deception." },
  "queen_of_cups.jpg": { upright: "Compassion, emotional depth.", reversed: "Coldness, over-sensitivity." },
  "king_of_cups.jpg": { upright: "Emotional balance, diplomacy.", reversed: "Manipulation, volatility." },

  "ace_of_swords.jpg": { upright: "Truth, clarity, breakthrough.", reversed: "Confusion, misinformation." },
  "two_of_swords.jpg": { upright: "Indecision, difficult choices.", reversed: "Avoidance, indecision." },
  "three_of_swords.jpg": { upright: "Heartbreak, sorrow, loss.", reversed: "Releasing pain, forgiveness." },
  "four_of_swords.jpg": { upright: "Rest, recovery, contemplation.", reversed: "Burnout, restlessness." },
  "five_of_swords.jpg": { upright: "Conflict, defeat, self-interest.", reversed: "Resolution, compromise." },
  "six_of_swords.jpg": { upright: "Transition, moving forward.", reversed: "Resistance, carrying baggage." },
  "seven_of_swords.jpg": { upright: "Strategy, stealth, resourcefulness.", reversed: "Deception exposed, coming clean." },
  "eight_of_swords.jpg": { upright: "Restriction, fear, paralysis.", reversed: "Freedom, self-liberation." },
  "nine_of_swords.jpg": { upright: "Anxiety, worry, nightmares.", reversed: "Relief, hope, recovery." },
  "ten_of_swords.jpg": { upright: "Endings, betrayal, rock bottom.", reversed: "Regeneration, recovery, survival." },
  "page_of_swords.jpg": { upright: "Curiosity, vigilance, ideas.", reversed: "Deception, gossip, haste." },
  "knight_of_swords.jpg": { upright: "Ambition, action, speed.", reversed: "Recklessness, impatience." },
  "queen_of_swords.jpg": { upright: "Clarity, truth, independence.", reversed: "Coldness, bitterness." },
  "king_of_swords.jpg": { upright: "Logic, authority, intellect.", reversed: "Manipulation, misuse of power." },

  "ace_of_pentacles.jpg": { upright: "New opportunity, prosperity.", reversed: "Missed chance, instability." },
  "two_of_pentacles.jpg": { upright: "Balance, adaptability, flexibility.", reversed: "Imbalance, disorganization." },
  "three_of_pentacles.jpg": { upright: "Collaboration, skill, teamwork.", reversed: "Lack of teamwork, poor planning." },
  "four_of_pentacles.jpg": { upright: "Security, control, conservation.", reversed: "Greed, letting go, generosity." },
  "five_of_pentacles.jpg": { upright: "Loss, poverty, isolation.", reversed: "Recovery, assistance, improvement." },
  "six_of_pentacles.jpg": { upright: "Generosity, giving, sharing wealth.", reversed: "Debt, selfishness, inequality." },
  "seven_of_pentacles.jpg": { upright: "Patience, perseverance, long-term view.", reversed: "Impatience, waste, frustration." },
  "eight_of_pentacles.jpg": { upright: "Mastery, diligence, skill-building.", reversed: "Mediocrity, lack of focus." },
  "nine_of_pentacles.jpg": { upright: "Luxury, self-sufficiency, abundance.", reversed: "Reckless spending, setbacks." },
  "ten_of_pentacles.jpg": { upright: "Wealth, inheritance, long-term success.", reversed: "Financial loss, instability." },
  "page_of_pentacles.jpg": { upright: "Ambition, learning, opportunity.", reversed: "Laziness, procrastination." },
  "knight_of_pentacles.jpg": { upright: "Hard work, reliability, patience.", reversed: "Boredom, laziness, stagnation." },
  "queen_of_pentacles.jpg": { upright: "Nurturing, practicality, prosperity.", reversed: "Neglect, imbalance, dependence." },
  "king_of_pentacles.jpg": { upright: "Abundance, stability, leadership.", reversed: "Greed, stubbornness, indulgence." }
};

// ========================
// Settings
// ========================
const imgPath = "cards/";
const readingDiv = document.getElementById("reading");
const buttons = document.querySelectorAll(".tarot-btn");

// ========================
// Draw 3 Unique Cards (with reversal)
// ========================
function drawCards() {
  const selected = [];
  while (selected.length < 3) {
    const card = cards[Math.floor(Math.random() * cards.length)];
    if (!selected.includes(card)) {
      const reversed = Math.random() < 0.5; // 50% chance reversed
      selected.push({ card, reversed });
    }
  }
  return selected;
}

// ========================
// Display Cards
// ========================
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    readingDiv.innerHTML = "";
    const selected = drawCards();
    const positions = ["Past", "Present", "Future"];

    selected.forEach((item, i) => {
      const { card, reversed } = item;
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card-slot");
      cardDiv.style.opacity = 0;
      cardDiv.style.transition = "opacity 1s ease";

      // Rotate reversed card
      const rotation = reversed ? "transform: rotate(180deg);" : "";

      cardDiv.innerHTML = `
        <p>${positions[i]}</p>
        <img src="${imgPath + card}" alt="${card}" style="${rotation}">
      `;

      const meaningDiv = document.createElement("div");
      meaningDiv.classList.add("card-meaning");
      meaningDiv.style.display = "none";

      const meaningSet = cardMeanings[card];
      let meaningText = "Meaning not found.";
      if (meaningSet) {
        meaningText = reversed ? meaningSet.reversed : meaningSet.upright;
        meaningText = `<strong>${reversed ? "Reversed" : "Upright"}:</strong> ${meaningText}`;
      }

      meaningDiv.innerHTML = meaningText;
      cardDiv.appendChild(meaningDiv);
      readingDiv.appendChild(cardDiv);

      // Fade-in animation delay
      setTimeout(() => {
        cardDiv.style.opacity = 1;
      }, i * 500);

      cardDiv.querySelector("img").addEventListener("click", () => {
        meaningDiv.style.display = meaningDiv.style.display === "none" ? "block" : "none";
      });
    });
  });
});

// ========================
// Font controls
// ========================
document.getElementById("fontSize").addEventListener("change", (e) => {
  readingDiv.style.fontSize = e.target.value;
});
document.getElementById("fontStyle").addEventListener("change", (e) => {
  readingDiv.style.fontFamily = e.target.value;
});
