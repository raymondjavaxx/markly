/**
 * Simple stack data structure.
 */
export default class Stack<Type> {
  private readonly items: Type[];

  constructor() {
    this.items = [];
  }

  push(item: Type): void {
    this.items.push(item);
  }

  pop(): Type | undefined {
    return this.items.pop();
  }

  top(): Type | undefined {
    if (this.items.length === 0) {
      return undefined;
    }

    return this.items[this.items.length - 1];
  }
}
