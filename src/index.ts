import {
	highlightTree,
	defaultHighlightStyle,
	HighlightStyle,
} from "@codemirror/next/highlight"
import { RangeSetBuilder } from "@codemirror/next/rangeset"
import { Decoration } from "@codemirror/next/view"

import type { Element } from "hast"
import type { Parser } from "lezer"

export function highlight(
	input: string,
	parser: Parser,
	highlightStyle: HighlightStyle = defaultHighlightStyle
): Element {
	const tree = parser.parse(input)

	const builder = new RangeSetBuilder<Decoration>()
	const marks: Record<string, Decoration> = {}
	highlightTree(tree, highlightStyle.match, (from, to, style) => {
		const mark =
			style in marks
				? marks[style]
				: (marks[style] = Decoration.mark({ class: style }))
		builder.add(from, to, mark)
	})

	const rangeSet = builder.finish()

	const root: Element = { type: "element", tagName: "code", children: [] }
	let current: Element | null = null
	let [from, to] = [0, 0]
	for (const cursor = rangeSet.iter(); cursor.value !== null; cursor.next()) {
		if (cursor.from === from) {
			current = {
				type: "element",
				tagName: "span",
				properties: { className: cursor.value.spec.class.split(" ") },
				children: current === null ? [] : [current],
			}

			if (cursor.to > to) {
				current.children.push({
					type: "text",
					value: input.slice(to, cursor.to),
				})
			}
		} else if (cursor.from >= to) {
			if (current !== null) {
				root.children.push(current)
			}

			if (cursor.from > to) {
				root.children.push({
					type: "text",
					value: input.slice(to, cursor.from),
				})
			}

			current = {
				type: "element",
				tagName: "span",
				properties: { className: cursor.value.spec.class.split(" ") },
				children: [
					{ type: "text", value: input.slice(cursor.from, cursor.to) },
				],
			}
		} else {
			throw new Error("Bad iteration order")
		}

		from = cursor.from
		to = cursor.to
	}

	return root
}
