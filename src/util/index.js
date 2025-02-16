export const getDomain = function(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null; // invalid URL
  }
}
