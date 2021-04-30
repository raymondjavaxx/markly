import render from "./render";
import Tokenizer from "./Tokenizer";

const tokenizer = new Tokenizer();

export default function markly(text: string): string {
  const tree = tokenizer.tokenize(text);
  const result = render(tree.children);
  return result.trim();
}
