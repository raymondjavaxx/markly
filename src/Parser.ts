import Stack from "./Stack";
import {TokenNode, TokenNodeType} from "./TokenNode";

/**
 * Markly parser.
 */
export default class Parser {

  /**
   * Parses Markly text into an AST.
   * @param text - Markly text.
   * @returns Parsed AST.
   */
  parse (text: string): TokenNode {
    const result = new TokenNode(TokenNodeType.ROOT);

    const chunks = Parser._extractChunks(text);
    for (const chunk of chunks) {
      result.append(...Parser._parseChunk(chunk));
    }

    return result;
  }

  private static _parseChunk (chunk: string): TokenNode[] {
    const lines = Parser._extractLines(chunk);

    const isList = (
      lines.length > 1 &&
      (
        lines.every(line => line.startsWith("* ")) ||
        lines.every(line => line.startsWith("- "))
      )
    );

    if (isList) {
      const listNode = new TokenNode(TokenNodeType.LIST);

      for (const line of lines) {
        listNode.append(
          new TokenNode(TokenNodeType.LITM, null, Parser._parseLine(line.substr(2)))
        );
      }

      return [
        listNode
      ];
    }

    const paragraphNode = new TokenNode(TokenNodeType.PARA);
    paragraphNode.append(...Parser._parseLine(chunk));
    return [
      paragraphNode
    ];
  }

  private static _parseLine (line: string): TokenNode[] {
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
            nodes.push(...Parser._parseLineBreaks(text));
          }

          const text = line.substring(start + 1, cursor);

          const boldNode = new TokenNode(TokenNodeType.BOLD);
          boldNode.append(...Parser._parseLineBreaks(text));
          nodes.push(boldNode);

          lastSegmentStart = cursor + 1;
        }

        cursor += 1;
      }
    }

    if (lastSegmentStart < line.length) {
      const text = line.substring(lastSegmentStart, line.length);
      nodes.push(...Parser._parseLineBreaks(text));
    }

    return nodes;
  }

  private static _parseLineBreaks(text: string): TokenNode[] {
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

  private static _extractLines (text: string): string[] {
    const lines = text.split("\n");
    return lines.map(line => line.trim());
  }

  private static _extractChunks (text: string): string[] {
    return text.trim().split(/\n(?:\s+)?\n/gm);
  }

}
