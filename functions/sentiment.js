const Sentiment = require("sentiment");
const SpellCorrector = require("spelling-corrector");

const spellCorrector = new SpellCorrector();
const sentiment = new Sentiment();
spellCorrector.loadDictionary();

function checkSentiment(words) {
  wordsArr = words.split(" ");
  const newArr = wordsArr.map((word) => {
    return spellCorrector.correct(word);
  });
  const newWords = newArr.join(" ");
  const res = sentiment.analyze(newWords);
  return {score : res.score , valid : true};
}

module.exports = checkSentiment;
