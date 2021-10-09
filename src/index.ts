import { classHighlightStyle, highlightTree } from "@codemirror/highlight"

import type { Element, Text } from "hast"
import type { Tree } from "@lezer/common"

export function fromCodeMirror(source: string, tree: Tree): Element {
	const children: (Element | Text)[] = []
	let index = 0
	highlightTree(tree, classHighlightStyle.match, (from, to, classes) => {
		if (from > index) {
			children.push({ type: "text", value: source.slice(index, from) })
		}

		children.push({
			type: "element",
			tagName: "span",
			properties: { className: classes },
			children: [{ type: "text", value: source.slice(from, to) }],
		})

		index = to
	})

	if (index < source.length) {
		children.push({ type: "text", value: source.slice(index) })
	}

	return { type: "element", tagName: "code", children }
}
