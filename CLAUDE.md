# Kidney Disease Project — IgA Nephropathy

## Project focus

This project is about **IgA nephropathy (Berger's disease)** and the search for promising treatments. Two aims:

1. **Prevention** — fix the malformed protein (galactose-deficient IgA1, *Gd-IgA1*) or stop it from becoming malformed.
2. **Reversal** — repair or reverse kidney damage that has already occurred.

---

## Standing directives (apply to every conversation)

### Surface corrections, suggestions, and better ideas
Whenever a conversation gives me reason to offer a **correction**, a **suggestion**, or a **better idea, concept, or theory**, I must tell the user about it — do not silently go along. Present each one under its **own section heading** with a short **intro remark** that makes clear what the point is and why it matters. Example headings: `## Correction — …`, `## Suggestion — …`, `## Better idea — …`. If there are none for a given exchange, say nothing extra.

### Define medical terms for non-specialists
Whenever a medical/technical term appears that a non-medical reader wouldn't commonly understand, **add a glossary entry** for it (plain-language definition) in `wiki/glossary-data.js`. The glossary auto-links every term (and its aliases) to its definition wherever it appears across the wiki, so adding one entry lights it up everywhere — no manual linking needed. Include alternate spellings/abbreviations in `aliases`.

### Maintain the project wiki
After any conversation with **significant discussion, discovery, question, or decision**, update the HTML wiki in [`wiki/`](wiki/index.html) *in the same turn*. See conventions below.

---

## The wiki

Location: **`wiki/`** — a self-contained set of cross-linked HTML files. Open `wiki/index.html` in a browser. No build step, no external dependencies (shared `style.css` + `wiki.js` only).

### Organizing principle
Organize content **by topic, logically — never chronologically.** The only chronological artifact is `conversations.html`, which is a dated index that links *into* the topic pages.

### File map
| File | Purpose |
|------|---------|
| `index.html` | Home / hub with nav cards |
| `mechanism.html` | Disease biology (the 4-hit model) |
| `aim-prevention.html` | Aim 1 content — fix/prevent Gd-IgA1 |
| `aim-reversal.html` | Aim 2 content — reverse damage |
| `hardproblem-glycosylation.html` | Deep-dive: correcting the C1GALT1/Cosmc glycosylation defect |
| `hardproblem-fibrosis.html` | Deep-dive: reversing established kidney fibrosis |
| `therapies.html` | Drug & target catalog (cross-cutting table) |
| `open-questions.html` | Running research backlog / hypotheses |
| `glossary.html` | Glossary UI — search box + list, rendered from `glossary-data.js` |
| `glossary-data.js` | **Single source of truth for the glossary** (terms, aliases, definitions) |
| `glossary.js` | Renders the glossary + partial-match search, and auto-links terms on every other page |
| `references.html` | All external links, grouped by conversation |
| `conversations.html` | Dated chronological index of conversations |
| `changelog.html` | Audit trail of wiki changes |
| `search.html` | Offline client-side search UI |
| `style.css` | Shared styles |
| `wiki.js` | **Single source of truth for the sidebar nav** (+ active-highlight, search box) |
| `search-index.js` | Static search index (one entry per page) |

Promote a topic to its own page (like the two `hardproblem-*` pages) once it accumulates real substance beyond a note in `open-questions.html`.

### How to update after a conversation
1. **File the content topically** — add or update the relevant topic page(s). Don't create a page per conversation.
2. **Add a dated entry** to `conversations.html` with the next sequential number (`id="cN"`), a summary, and links into the topic pages it touched. Date every conversation (`YYYY-MM-DD`). Today's date comes from session context.
3. **Record every reference** in `references.html` under that conversation's heading. Use **real URLs** when a source is actually cited; when discussion is from background knowledge, use **reliable verification searches** (PubMed / ClinicalTrials.gov query URLs) rather than guessing deep links.
4. **Update `open-questions.html`** if new unknowns arose; strike/close ones that got resolved.
5. **Add a dated entry to `changelog.html`** summarizing what changed in the wiki.
6. **Update `search-index.js`** if you added a page or changed what a page is about (add/adjust its keywords).
7. **Bump the `Last updated:` date** in the `.updated` line of every page you changed.
8. Add new medical terms to `glossary-data.js` as they come up (see the "Define medical terms" directive). Every content page loads `glossary-data.js` + `glossary.js` after `wiki.js`; new pages must include those two script tags too.

### Conventions
- The sidebar nav lives ONLY in `wiki.js`. Each page just has an empty `<nav class="sidebar"></nav>` and ends with `<script src="wiki.js"></script>`. To add a page to the nav, add one line to the `NAV` array in `wiki.js` — never hand-edit nav in individual pages.
- Reuse existing CSS classes: `.callout` (`.q` for questions, `.warn` for caveats), `.pill` (`.approved`/`.phase3`/`.phase2`/`.research`), `.card`, `.conv`, `.tag-row`, tables.
- Cross-link liberally between topic pages, the mechanism model, and the conversation log.
- Keep status/phase claims honest and dated — drug development moves fast; point to `references.html` for verification.

---

## Related
- Persistent memory: `/Users/phil/.claude/projects/-Users-phil-dev-kidney-disease/memory/` (see `project-focus.md`).
