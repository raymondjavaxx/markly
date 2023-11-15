import Stack from "./Stack";
import { TokenNode, TokenNodeType } from "./TokenNode";

/**
 * Parses Markly text into an AST.
 * @param text - Markly text.
 * @returns Parsed AST.
 */
export default function parse(text: string): TokenNode {
  const result = new TokenNode(TokenNodeType.ROOT);

  const chunks = extractChunks(text);
  for (const chunk of chunks) {
    result.append(...parseChunk(chunk));
  }

  return result;
}

function parseChunk(chunk: string): TokenNode[] {
  const lines = extractLines(chunk);

  const isList =
    lines.length > 1 &&
    (lines.every((line) => line.startsWith("* ")) ||
      lines.every((line) => line.startsWith("- ")));

  if (isList) {
    const listNode = new TokenNode(TokenNodeType.LIST);

    for (const line of lines) {
      listNode.append(
        new TokenNode(TokenNodeType.LITM, null, parseLine(line.substr(2)))
      );
    }

    return [listNode];
  }

  const paragraphNode = new TokenNode(TokenNodeType.PARA);
  paragraphNode.append(...parseLine(chunk));
  return [paragraphNode];
}

function parseLine(line: string): TokenNode[] {
  let cursor = 0;

  let lastSegmentStart = 0;
  const nodeStack = new Stack<number>();

  const nodes: TokenNode[] = [];

  while (cursor !== -1 && cursor < line.length) {
    cursor = line.indexOf("*", cursor);
    if (cursor !== -1) {
      if (nodeStack.top() === undefined) {
        nodeStack.push(cursor);
      } else {
        const start = nodeStack.pop();

        if (lastSegmentStart < start) {
          const text = line.substring(lastSegmentStart, start);
          nodes.push(...parseLineBreaks(text));
        }

        const text = line.substring(start + 1, cursor);

        const boldNode = new TokenNode(TokenNodeType.BOLD);
        boldNode.append(...parseLineBreaks(text));
        nodes.push(boldNode);

        lastSegmentStart = cursor + 1;
      }

      cursor += 1;
    }
  }

  if (lastSegmentStart < line.length) {
    const text = line.substring(lastSegmentStart, line.length);
    nodes.push(...parseLineBreaks(text));
  }

  return nodes;
}

function parseLineBreaks(text: string): TokenNode[] {
  const nodes: TokenNode[] = [];

  const parts = text.split("\n");

  for (let i = 0; i < parts.length; i += 1) {
    if (i >= 1) {
      nodes.push(new TokenNode(TokenNodeType.LNBR));
    }

    nodes.push(new TokenNode(TokenNodeType.TEXT, parts[i]));
  }

  return nodes;
}

function extractLines(text: string): string[] {
  const lines = text.split("\n");
  return lines.map((line) => line.trim());
}

function extractChunks(text: string): string[] {
  return text.trim().split(/\n(?:\s+)?\n/gm);
}
