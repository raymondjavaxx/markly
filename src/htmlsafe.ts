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

export default function htmlSafe (text: string): string {
  return text.replace(/["&'<>]/g, (char) => {
    return SPECIAL_HTML_CHARACTERS[char];
  });
}
