// Glossary engine. On the glossary page it renders the term list + search box.
// On every other page it auto-links the first occurrence of each glossary term
// to its definition. Data comes from glossary-data.js (GLOSSARY).

(function () {
  if (typeof GLOSSARY === "undefined") return;

  function slugify(s) {
    return s.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  function escapeHtml(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function isWordChar(c) { return c !== undefined && /[A-Za-z0-9]/.test(c); }

  // Attach a slug to every entry, and build a flat, longest-first list of the
  // surface forms (term + aliases) that should link back to it.
  GLOSSARY.forEach(function (e) { e.slug = slugify(e.term); });
  var forms = [];
  GLOSSARY.forEach(function (e) {
    [e.term].concat(e.aliases || []).forEach(function (t) {
      forms.push({ text: t, entry: e });
    });
  });
  forms.sort(function (a, b) { return b.text.length - a.text.length; });

  var onGlossaryPage = !!document.getElementById("glossaryApp");

  // ---------- Glossary page: render + partial-match search ----------
  if (onGlossaryPage) {
    var sorted = GLOSSARY.slice().sort(function (a, b) {
      return a.term.toLowerCase().localeCompare(b.term.toLowerCase());
    });

    function markMatch(text, q) {
      if (!q) return escapeHtml(text);
      var re = new RegExp("(" + escapeRe(q) + ")", "ig");
      return escapeHtml(text).replace(re, "<mark>$1</mark>");
    }

    function render(query) {
      var q = (query || "").trim().toLowerCase();
      var list = sorted.filter(function (e) {
        if (!q) return true;
        var hay = (e.term + " " + (e.aliases || []).join(" ") + " " + e.def).toLowerCase();
        return hay.indexOf(q) > -1; // substring => partial-word matches
      });
      var meta = document.getElementById("glossMeta");
      meta.textContent = q
        ? list.length + " of " + sorted.length + " term" + (list.length === 1 ? "" : "s") + " match “" + query.trim() + "”"
        : sorted.length + " terms";
      var html = list.map(function (e) {
        var aliases = (e.aliases || []).length
          ? '<span class="gloss-aliases">also: ' + markMatch(e.aliases.join(", "), query) + "</span>"
          : "";
        return '<div class="gloss-entry" id="' + e.slug + '">' +
          '<div class="gloss-term">' + markMatch(e.term, query) + "</div>" +
          aliases +
          '<div class="gloss-def">' + markMatch(e.def, query) + "</div></div>";
      }).join("");
      document.getElementById("glossList").innerHTML =
        html || '<p class="search-meta">No matching terms.</p>';
    }

    var input = document.getElementById("glossSearch");
    input.addEventListener("input", function () { render(this.value); });
    render("");

    // If arrived via a #term link, scroll to and flash the entry.
    function flashHash() {
      var id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      // The list is rendered by JS, so the browser's own jump-to-anchor on load
      // misses it. Scroll after the next paint, once the entry exists.
      requestAnimationFrame(function () {
        var el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ block: "start", behavior: "auto" });
        el.classList.add("gloss-flash");
        setTimeout(function () { el.classList.remove("gloss-flash"); }, 2200);
      });
    }
    flashHash();
    window.addEventListener("hashchange", flashHash);
    return;
  }

  // ---------- Every other page: auto-link terms in the main content ----------
  var main = document.querySelector("main.main");
  if (!main) return;

  function eligible(node) {
    var p = node.parentElement;
    while (p && p !== main) {
      var tag = p.tagName;
      if (tag === "A" || tag === "CODE" || tag === "SCRIPT" || tag === "STYLE" ||
          tag === "H1" || tag === "H2" || tag === "H3" || tag === "H4" || tag === "TH") {
        return false;
      }
      if (p.classList && p.classList.contains("no-glossary")) return false;
      p = p.parentElement;
    }
    return true;
  }

  function firstMatch(text, term) {
    var hay = text.toLowerCase(), needle = term.toLowerCase(), from = 0, i;
    while ((i = hay.indexOf(needle, from)) > -1) {
      var before = text[i - 1], after = text[i + term.length];
      if (!isWordChar(before) && !isWordChar(after)) return i;
      from = i + 1;
    }
    return -1;
  }

  forms.forEach(function (f) {
    if (f.entry._linked) return; // one link per term per page
    // Fresh walk each term so we never touch nodes already inside a new link.
    var walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      if (!node.nodeValue || !node.nodeValue.trim()) continue;
      if (!eligible(node)) continue;
      var idx = firstMatch(node.nodeValue, f.text);
      if (idx === -1) continue;

      var text = node.nodeValue;
      var matched = text.substr(idx, f.text.length);
      var a = document.createElement("a");
      a.href = "glossary.html#" + f.entry.slug;
      a.className = "glossary-link";
      a.title = f.entry.term + " — " + f.entry.def;
      a.textContent = matched;

      var after = document.createTextNode(text.slice(idx + f.text.length));
      node.nodeValue = text.slice(0, idx);
      node.parentNode.insertBefore(after, node.nextSibling);
      node.parentNode.insertBefore(a, after);

      f.entry._linked = true;
      break;
    }
  });
})();
