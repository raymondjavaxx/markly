import markly from "../src/index";
import { describe, expect, test } from "@jest/globals";

describe("markly", function () {
  test("should parse and produce HTML", function () {
    const result = markly(
      "Hello\n" +
      "\n" +
      "* Item 1\n" +
      "* Item 2\n" +
      "* Item 3\n" +
      "\n" +
      "It can render *bold text* ok.\n" +
      "\n" +
      "This is a paragraph\n" +
      "with a line break\n" +
      "\n" +
      "Another <b>list</b>:\n" +
      "\n" +
      "- Item 1\n" +
      "- *Item* 2\n" +
      "- Item 3\n"
    );

    expect(result).toBe(
      "<p>Hello</p>\n" +
      "<ul>\n" +
      "<li>Item 1</li>\n" +
      "<li>Item 2</li>\n" +
      "<li>Item 3</li>\n" +
      "</ul>\n" +
      "<p>It can render <strong>bold text</strong> ok.</p>\n" +
      "<p>This is a paragraph<br>\n" +
      "with a line break</p>\n" +
      "<p>Another &lt;b&gt;list&lt;/b&gt;:</p>\n" +
      "<ul>\n" +
      "<li>Item 1</li>\n" +
      "<li><strong>Item</strong> 2</li>\n" +
      "<li>Item 3</li>\n" +
      "</ul>"
    );
  });

  test("should preserve unmatched formatting tokens", function () {
    expect(markly("Some text*")).toBe("<p>Some text*</p>");
    expect(markly("*Some text**")).toBe("<p><strong>Some text</strong>*</p>");
    expect(markly("*Some *text*")).toBe("<p><strong>Some </strong>text*</p>");
  });

  test("lists should not require trailing line break", function () {
    expect(markly("* One\n* Two\n* Three")).toBe(
      "<ul>\n" +
      "<li>One</li>\n" +
      "<li>Two</li>\n" +
      "<li>Three</li>\n" +
      "</ul>"
    );
  });
});
