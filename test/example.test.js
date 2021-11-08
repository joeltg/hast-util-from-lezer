import { readFileSync } from "fs"

import { toHtml } from "hast-util-to-html"
import { javascriptLanguage } from "@codemirror/lang-javascript"

import { fromCodeMirror } from "../lib/index.js"

import test from "ava"

test("example.js", (t) => {
	const source = readFileSync("./test/example.js", "utf-8")
	const tree = javascriptLanguage.parser.parse(source)
	const root = fromCodeMirror(source, tree)
	console.log(toHtml(root))
	t.pass()
})
