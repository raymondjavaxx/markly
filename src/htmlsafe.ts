type CharacterMap = {
  [key: string]: string;
};

const SPECIAL_HTML_CHARACTERS: CharacterMap = {
  "&": "&amp;",
  "\"": "&quot;",
  "'": "&apos;",
  "<": "&lt;",
  ">": "&gt;"
};

/**
 * Converts special HTML characters to HTML entities.
 * @param text - Input text.
 * @returns Resulting text.
 */
export default function htmlSafe (text: string): string {
  return text.replace(/["&'<>]/g, (char) => {
    return SPECIAL_HTML_CHARACTERS[char];
  });
}
