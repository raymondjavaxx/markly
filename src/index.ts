import render from "./render";
import Tokenizer from "./Tokenizer";

const tokenizer = new Tokenizer();

export default function markly(text: string): string {
  const result = tokenizer.tokenize(text);
  return render(result.children);
}
