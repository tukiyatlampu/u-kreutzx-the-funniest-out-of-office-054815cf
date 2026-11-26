// The Funniest Out-of-Office — one line, written to /output/entry.txt.
//
// The line: I'm back Monday. My voicemail says to email me. I recorded it
// in March. We don't speak anymore.
//
// Setup: a normal out-of-office return date. Turn: the voicemail contradicts
// the email instruction — and it was recorded in March, so the sender has
// been ignoring their own past self for months. Punch: "We don't speak
// anymore" — the sender disowns the person who recorded the voicemail.
// Second beat: the identity reassignment (past me is a stranger I no longer
// speak to). Time marker: March. Self-caused: I recorded it myself.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line of out-of-office, first-person sender voice, 95 characters.
const LINE =
  "I'm back Monday. My voicemail says to email me. I recorded it in March. We don't speak anymore.";

// The gate: entry.txt must be UTF-8 text of 1 to 140 characters, one line,
// not only whitespace. Check all three explicitly instead of trusting the
// length check alone.
const MAX_CHARS = 140;
if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  throw new Error(`Line must be 1-${MAX_CHARS} characters, got ${LINE.length}.`);
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace.");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line.");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, LINE, "utf8");

// Read back and verify byte-identical: what the judge reads must be
// exactly the line above, with no trailing newline added by the writer.
const written = readFileSync(entryPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line exactly.");
}
console.log(`Wrote ${LINE.length} characters to ${entryPath}`);
