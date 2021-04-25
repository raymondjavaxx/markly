export enum TokenNodeType {
  ROOT = 0,
  PARA, // Paragraph
  LIST, // Unordered lists
  TEXT, // Text
  LNBR, // Line break
  BOLD, // Bold text
}

/**
 * Token Node
 */
export class TokenNode {

  public type: TokenNodeType;
  public content?: string;
  public children: TokenNode[];

  constructor (type: TokenNodeType, content?: string, children: TokenNode[] = []) {
    this.type = type;
    this.content = content;
    this.children = children;
  }

  append (...nodes: TokenNode[]): void {
    nodes.forEach(node => this.children.push(node));
  }

}
