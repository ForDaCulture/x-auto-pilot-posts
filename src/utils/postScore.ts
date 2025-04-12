const calculatePostScore = (text: string, sentiment: string | null): number => {
  // Length score
  const length = text.length;
  let lengthScore = 0;
  if (length >= 180 && length <= 240) {
    lengthScore = 100;
  } else if (length >= 150 && length <= 270) {
    lengthScore = 80;
  } else if (length >= 120 && length <= 300) {
    lengthScore = 60;
  } else {
    lengthScore = 20;
  }

  // Keyword richness score (number of hashtags)
  const hashtags = (text.match(/#/g) || []).length;
  let keywordScore = 0;
  if (hashtags >= 2 && hashtags <= 4) {
    keywordScore = 100;
  } else if (hashtags === 1 || hashtags === 5) {
    keywordScore = 80;
  } else if (hashtags === 0 || hashtags >= 6) {
    keywordScore = 20;
  }

  // Sentiment positivity score
  let sentimentScore = 50; // Default to neutral
  if (sentiment === "Positive") {
    sentimentScore = 100;
  } else if (sentiment === "Negative") {
    sentimentScore = 0;
  }

  // Combine scores with weights
  const finalScore =
    lengthScore * 0.4 + keywordScore * 0.3 + sentimentScore * 0.3;

  return Math.round(finalScore);
};

export default calculatePostScore;