/**
 * Token node types.
 */
export enum TokenNodeType {
  ROOT = 0,
  PARA, // Paragraph
  LIST, // Unordered lists
  LITM, // List item
  TEXT, // Text
  LNBR, // Line break
  BOLD, // Bold text
}

/**
 * Token Node
 */
export class TokenNode {

  /**
   * Type of the node.
   */
  public type: TokenNodeType;

  /**
   * Text content of the node.
   */
  public content?: string;

  /**
   * Children nodes.
   */
  public children: TokenNode[];

  /**
   * Constructor.
   * @param type - Type of the node.
   * @param content - Text content of the node.
   * @param children - List of children nodes.
   */
  constructor (type: TokenNodeType, content?: string, children: TokenNode[] = []) {
    this.type = type;
    this.content = content;
    this.children = children;
  }

  /**
   * Append one or more children nodes.
   * @param nodes - Token nodes to be appended.
   */
  append (...nodes: TokenNode[]): void {
    nodes.forEach(node => this.children.push(node));
  }

}
