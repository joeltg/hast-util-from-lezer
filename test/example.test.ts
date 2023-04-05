import { readFileSync, writeFileSync } from "node:fs"

import { parser } from "@lezer/javascript"
import { toHtml } from "hast-util-to-html"

import { fromLezer } from "hast-util-from-lezer"

import test from "ava"

const template = (content: string) => `<!DOCTYPE html>
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
