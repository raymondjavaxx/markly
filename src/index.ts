import render from "./render";
import Parser from "./Parser";

const parser = new Parser();

/**
 * Convert text to HTML.
 * @param text - Markly formatted text.
 * @returns HTML result.
 */
export default function markly(text: string): string {
  const ast = parser.parse(text);
  const result = render(ast.children);
  return result.trim();
}
