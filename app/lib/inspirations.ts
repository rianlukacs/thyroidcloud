export const inspirations = [
  "Embrace your journey. Every small step is a victory worth celebrating.",
  "Your strength is greater than any thyroid challenge. Keep shining!",
  "Nourish your body, calm your mind, and let your spirit soar.",
  "You are not defined by your thyroid. You are defined by your courage and resilience.",
  "Today is a new opportunity to love and care for yourself.",
  "Your well-being is a priority. It's okay to put yourself first.",
  "Small changes lead to big transformations. Trust the process.",
  "You are stronger than you know and braver than you believe.",
  "Your body is listening. Treat it with kindness and patience.",
  "Every day is a chance to feel better and grow stronger.",
  "Healing takes time, but every step forward is a triumph. Keep moving—you’re doing amazing.",
  "Your worth is not measured by how you feel today. You are valuable, always.",
  "Even on the hardest days, your strength shines like a beacon. Never forget it.",
  "Your journey may be unique, but you’re never alone. There’s a world of support rooting for you.",
  "The smallest acts of self-care can create the biggest waves of transformation.",
  "You are a masterpiece in progress—beautifully imperfect and endlessly worthy.",
  "Remember, progress is not linear. Celebrate every little win along the way.",
  "Your body is a temple of resilience. Treat it with the love and respect it deserves.",
  "Hope is a powerful force. Let it guide you through even the darkest moments.",
  "You are more than your diagnosis. You are a spark of infinite possibility.",
  "Celebrate the small victories—they are the building blocks of your success.",
  "Healing isn’t about perfection; it’s about finding balance and honoring your needs.",
  "Listen to your body. It holds wisdom beyond measure.",
  "Your journey inspires more people than you realize. Keep shining your light.",
  "Every sunrise brings a new chance to move closer to your goals.",
  "Self-care is not selfish. It’s the foundation of your strength and vitality.",
  "You are rewriting your story every day, and it’s a story of courage and hope.",
  "Your struggles are valid, but they don’t define you. You are defined by your strength.",
  "Take pride in how far you’ve come. The road ahead is yours to conquer.",
  "Healing is messy, beautiful, and worth every moment of effort.",
  "Even in your quietest battles, you are a warrior. Stand tall.",
  "Be patient with yourself; growth happens in the small moments of care and love.",
  "Your health journey is a testament to your incredible resilience.",
  "No storm lasts forever. Brighter days are ahead—keep believing.",
  "You have the power to transform your challenges into stepping stones.",
  "You are not alone in this. Lean on your support system—they’re here for you.",
  "Honor your body by giving it the love and nourishment it deserves.",
  "Progress is progress, no matter how small. Keep celebrating your wins.",
  "Healing starts with believing that you deserve to feel good again.",
  "You are the author of your journey. Write a story of courage and grace.",
  "Be kind to yourself on hard days. You’re doing the best you can.",
  "Your inner strength is the foundation of everything you’re building. Trust it.",
  "Healing doesn’t mean you’ll never struggle; it means you’ll rise every time you do.",
  "Self-compassion is the greatest gift you can give yourself.",
  "Your body hears everything you say. Speak to it with love and gratitude.",
  "Trust the process, even when it feels slow. Growth is happening.",
  "You are not your symptoms. You are a soul of infinite potential.",
  "Rest is not weakness. It’s a necessary part of becoming your best self.",
  "Your health journey is unique, and so is your strength. Embrace it.",
  "Courage doesn’t always roar. Sometimes, it’s the quiet resolve to try again tomorrow.",
  "Celebrate the small steps—they’re the ones that lead to giant leaps.",
  "Healing is a journey, not a destination. Be gentle with yourself along the way.",
  "You are enough, exactly as you are in this moment.",
  "Even the smallest habits can lead to the biggest breakthroughs.",
  "Focus on progress, not perfection. You’re doing beautifully.",
  "Your health journey is a marathon, not a sprint. Pace yourself with love.",
  "In the midst of your challenges, you are planting seeds of strength and growth.",
  "Your courage is contagious. Keep inspiring those around you.",
  "Healing is a messy, beautiful process. Trust yourself through it all.",
  "Celebrate how far you’ve come instead of worrying about how far you have to go."
];

export function getRandomInspiration(): string {
  const randomIndex = Math.floor(Math.random() * inspirations.length);
  return inspirations[randomIndex];
}

