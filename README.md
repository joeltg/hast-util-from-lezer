# hast-util-from-codemirror

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme) [![license](https://img.shields.io/github/license/joeltg/hast-util-from-codemirror)](https://opensource.org/licenses/MIT) [![NPM version](https://img.shields.io/npm/v/hast-util-from-codemirror)](https://www.npmjs.com/package/hast-util-from-codemirror) ![TypeScript types](https://img.shields.io/npm/types/hast-util-from-codemirror) ![lines of code](https://img.shields.io/tokei/lines/github/joeltg/hast-util-from-codemirror)

Render styled [Lezer syntax trees](https://github.com/lezer-parser/common) to [hast](https://github.com/syntax-tree/hast).

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
import { typescriptLanguage } from "@codemirror/lang-javascript"
import { toHtml } from "hast-util-to-html"

const source = `function norm(a: number, b: number): number {
	return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}`

const tree = javascriptLanguage.parser.parse(source)
const element = fromCodeMirror(source, tree)
console.log(toHtml(element))
```

yields the following HTML:

```
<span class="cmt-keyword">function</span> <span class="cmt-variableName">norm</span><span class="cmt-punctuation">(</span><span class="cmt-variableName cmt-definition">a</span><span class="cmt-punctuation">:</span> <span class="cmt-typeName">number</span><span class="cmt-punctuation">,</span> <span class="cmt-variableName cmt-definition">b</span><span class="cmt-punctuation">:</span> <span class="cmt-typeName">number</span><span class="cmt-punctuation">)</span><span class="cmt-punctuation">:</span> <span class="cmt-typeName">number</span> <span class="cmt-punctuation">{</span>
        <span class="cmt-keyword">return</span> <span class="cmt-variableName">Math</span><span class="cmt-operator">.</span><span class="cmt-propertyName">sqrt</span><span class="cmt-punctuation">(</span><span class="cmt-variableName">Math</span><span class="cmt-operator">.</span><span class="cmt-propertyName">pow</span><span class="cmt-punctuation">(</span><span class="cmt-variableName">a</span><span class="cmt-punctuation">,</span> <span class="cmt-number">2</span><span class="cmt-punctuation">)</span> <span class="cmt-operator">+</span> <span class="cmt-variableName">Math</span><span class="cmt-operator">.</span><span class="cmt-propertyName">pow</span><span class="cmt-punctuation">(</span><span class="cmt-variableName">b</span><span class="cmt-punctuation">,</span> <span class="cmt-number">2</span><span class="cmt-punctuation">)</span><span class="cmt-punctuation">)</span>
<span class="cmt-punctuation">}</span>
```

Wrap this inside a `pre` tag and add [styles/default.css](./styles/default.css) for high-quality runtime pure-JS syntax highlighting!

![highlighted code snipped](example.png)

## API

```typescript
import type { Tree } from "@lezer/common"
import type { Root } from "hast"

declare function fromCodeMirror(source: string, tree: Tree): Root
```

`tree` must already be styled if you want highlighting classnames in the resulting hast. Generally, this just means that you need to import a _CodeMirror language_ like `@codemmirror/lang-javascript` and not a basic Lezer parser like `@lezer/javascript`. If you give `fromCodeMirror` a tree taken directly from a basic Lezer parser, then you'll just get the source back as a single text node.

Due to technical limitations, hast-util-from-codemirror only uses [`classHighlightStyle`](https://codemirror.net/6/docs/ref/#highlight.classHighlightStyle) internally - you can't provide it with a custom [`HighlightStyle`](https://codemirror.net/6/docs/ref/#highlight.HighlightStyle) and it can't use highlight styles that inline CSS.

## Contributing

hast-util-from-codemirror is meant to be a minimal utility library - it's unlikely that I'll want to add new features to it, but if you find bugs, have interface or API suggestions, or general feedback, feel free to open an issue to discuss it!

## License

MIT (c) 2021 Joel Gustafson
