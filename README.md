# hast-util-from-codemirror

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme) [![license](https://img.shields.io/github/license/joeltg/hast-util-from-codemirror)](https://opensource.org/licenses/MIT) [![NPM version](https://img.shields.io/npm/v/hast-util-from-codemirror)](https://www.npmjs.com/package/hast-util-from-codemirror) ![TypeScript types](https://img.shields.io/npm/types/hast-util-from-codemirror) ![lines of code](https://img.shields.io/tokei/lines/github/joeltg/hast-util-from-codemirror)

Render highlighted [Lezer syntax trees](https://github.com/lezer-parser/common) to [hast](https://github.com/syntax-tree/hast).

## Table of contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Install

```
npm i hast-util-from-codemirror
```

## Usage

```typescript
import { fromCodeMirror } from "hast-util-from-codemirror"
import { javascriptLanguage } from "@codemirror/lang-javascript"

const source = `function foo(a, b) {
	return null
}`

const tree = javascriptLanguage.parser.parse(source)
const element = {
	type: "element",
	tagName: "pre",
	children: fromCodeMirror(source, tree),
}
console.log(toHtml(element))
```

yields the following HTML:

```html
<pre><span class="cmt-keyword">function</span> <span class="cmt-variableName">foo</span><span class="cmt-punctuation">(</span><span class="cmt-variableName cmt-definition">a</span><span class="cmt-punctuation">,</span> <span class="cmt-variableName cmt-definition">b</span><span class="cmt-punctuation">)</span> <span class="cmt-punctuation">{</span>
        <span class="cmt-keyword">return</span> <span class="cmt-keyword">null</span>
<span class="cmt-punctuation">}</span></pre>
```

## API

```typescript
import type { Tree } from "@lezer/common"
import type { Element, Text } from "hast"

declare function fromCodeMirror(source: string, tree: Tree): (Element | Text)[]
```

`tree` must already be highlighted if you want highlighting classnames in the resulting hast. If you pass `fromCodeMirror` a tree taken directly from a basic Lezer parser without highlighting, then you'll just get `<pre>{source}</pre>`.

## Contributing

hast-util-from-codemirror is meant to be a minimal utility library - it's unlikely that I'll want to add new features to it, but if you find bugs, have interface or API suggestions, or general feedback, feel free to open an issue to discuss it!

## License

MIT (c) 2021 Joel Gustafson
