import { readFileSync, writeFileSync } from "fs"

import { toHtml } from "hast-util-to-html"
import { parser } from "@lezer/javascript"

import { fromLezer } from "../lib/index.js"

import test from "ava"

const template = (content) => `<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>example</title>
		<link href="../styles/default.css" rel="stylesheet" type="text/css" />
	</head>
	<body>
		<pre>${content}</pre>
	</body>
</html>`

test("example.js", (t) => {
	const source = readFileSync("./test/example.js", "utf-8")
	const tree = parser.parse(source)
	const root = fromLezer(source, tree)
	writeFileSync("./test/example.html", template(toHtml(root)))
	t.pass()
})
