import htmlSafe from "../src/htmlsafe";
import { describe, expect, test } from "@jest/globals";

describe("htmlSafe", function () {
  test("should escape angle brackets", function () {
    const result = htmlSafe("<b>Hello</b>");
    expect(result).toBe("&lt;b&gt;Hello&lt;/b&gt;");
  });

  test("should escape ampersand", function () {
    const result = htmlSafe("pen & paper");
    expect(result).toBe("pen &amp; paper");
  });

  test("should escape double quotes", function () {
    const result = htmlSafe("\"Hello\"");
    expect(result).toBe("&quot;Hello&quot;");
  });

  test("should escape single quotes", function () {
    const result = htmlSafe("'Hello'");
    expect(result).toBe("&apos;Hello&apos;");
  });
});
