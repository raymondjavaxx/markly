import parse  from "./parse";
import render from "./render";

/**
 * Convert text to HTML.
 * @param text - Markly formatted text.
 * @returns HTML result.
 */
export default function markly(text: string): string {
  const ast = parse(text);
  const result = render(ast.children);
  return result.trim();
}
