# hast-util-from-lezer

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
npm i hast-util-from-lezer
```

## Usage

```typescript
import { fromLezer } from "hast-util-from-lezer"
import { typescriptLanguage } from "@codemirror/lang-javascript"
import { toHtml } from "hast-util-to-html"

const source = `function norm(a: number, b: number): number {
	return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}`

const tree = javascriptLanguage.parser.parse(source)
const element = fromLezer(source, tree)
console.log(toHtml(element))
```

yields the following HTML:

```
<span class="tok-keyword">function</span> <span class="tok-variableName">norm</span><span class="tok-punctuation">(</span><span class="tok-variableName tok-definition">a</span><span class="tok-punctuation">:</span> <span class="tok-typeName">number</span><span class="tok-punctuation">,</span> <span class="tok-variableName tok-definition">b</span><span class="tok-punctuation">:</span> <span class="tok-typeName">number</span><span class="tok-punctuation">)</span><span class="tok-punctuation">:</span> <span class="tok-typeName">number</span> <span class="tok-punctuation">{</span>
        <span class="tok-keyword">return</span> <span class="tok-variableName">Math</span><span class="tok-operator">.</span><span class="tok-propertyName">sqrt</span><span class="tok-punctuation">(</span><span class="tok-variableName">Math</span><span class="tok-operator">.</span><span class="tok-propertyName">pow</span><span class="tok-punctuation">(</span><span class="tok-variableName">a</span><span class="tok-punctuation">,</span> <span class="tok-number">2</span><span class="tok-punctuation">)</span> <span class="tok-operator">+</span> <span class="tok-variableName">Math</span><span class="tok-operator">.</span><span class="tok-propertyName">pow</span><span class="tok-punctuation">(</span><span class="tok-variableName">b</span><span class="tok-punctuation">,</span> <span class="tok-number">2</span><span class="tok-punctuation">)</span><span class="tok-punctuation">)</span>
<span class="tok-punctuation">}</span>
```

Wrap this inside a `pre` tag and add [styles/default.css](./styles/default.css) for high-quality runtime pure-JS syntax highlighting!

![highlighted code snipped](example.png)

## API

```typescript
import type { Tree } from "@lezer/common"
import type { Root } from "hast"

declare function fromLezer(source: string, tree: Tree): Root
```

`tree` must already be styled if you want highlighting classnames in the resulting hast. This means the Lezer grammar you're using has to support highlight style props, typically included with a `highlight.js` file and a `@external propSource` directive in the grammar source. All the Lezer grammars maintained by the Lezer project do; you shouldn't have to worry about it.

## Contributing

hast-util-from-codemirror is meant to be a minimal utility library - it's unlikely that I'll want to add new features to it, but if you find bugs, have interface or API suggestions, or general feedback, feel free to open an issue to discuss it!

## License

MIT (c) 2021 Joel Gustafson
