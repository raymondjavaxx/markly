# Markly

A micro subset of Markdown.

## Differences with Markdown

1. Markly only support paragraphs, non-nested unordered lists, and bold text.
2. Markly will always translate line breaks to `<br>` tags.  
3. No support for embedding arbitrary HTML.

These limitations are in place by design and there are no plans for supporting additional features.

## Use cases

* Product descriptions
* Chat UIs
* Places where basic formatting of user generated content is needed, without the risk of breaking the UI/layout.
