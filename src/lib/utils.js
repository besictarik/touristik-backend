const generateCroatianRegex = (input) => {
  const croatianDiacritics = {
    c: "[cčć]",
    d: "[dđ]",
    s: "[sš]",
    z: "[zž]",
  };

  // Escape special regex characters in the input
  let regexString = input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Replace letters with their regex equivalents
  for (const [key, value] of Object.entries(croatianDiacritics)) {
    regexString = regexString.replace(new RegExp(key, "gi"), value);
  }

  return new RegExp(regexString, "i"); // Case-insensitive
};

const normalizeString = (string) => {
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

module.exports = { generateCroatianRegex, normalizeString };
