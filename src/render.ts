import { TokenNode, TokenNodeType } from "./TokenNode";
import htmlSafe from "./htmlsafe";

export default function render (nodes: TokenNode[]): string {
  const result: string[] = [];

  for (const node of nodes) {
    switch (node.type) {
    case TokenNodeType.LNBR:
      result.push("<br>\n");
      break;
    case TokenNodeType.TEXT:
      result.push(htmlSafe(node.content));
      break;
    case TokenNodeType.LIST:
      result.push("<ul>\n");
      result.push(render(node.children));
      result.push("</ul>\n");
      break;
    case TokenNodeType.LITM:
      result.push(`<li>${render(node.children)}</li>\n`);
      break;
    case TokenNodeType.PARA:
      result.push(`<p>${render(node.children)}</p>\n`);
      break;
    case TokenNodeType.BOLD:
      result.push(`<strong>${render(node.children)}</strong>`);
      break;
    }
  }

  return result.join("");
}
