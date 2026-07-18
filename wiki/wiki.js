// Single source of truth for the sidebar nav. Injected into every page's
// <nav class="sidebar"> element, then the current page is highlighted.
// To add a page to the wiki, add one line here — no need to edit every file.

(function () {
  var NAV = [
    { section: 'Overview' },
    { href: 'index.html', label: 'Home' },
    { href: 'mechanism.html', label: 'Disease Mechanism' },
    { section: 'Research Aims' },
    { href: 'aim-prevention.html', label: 'Aim 1 · Prevent / Fix Gd-IgA1' },
    { href: 'aim-reversal.html', label: 'Aim 2 · Reverse Damage' },
    { section: 'Hard Problems' },
    { href: 'hardproblem-glycosylation.html', label: 'Fix the Gd-IgA1 Glycosylation Defect' },
    { href: 'hardproblem-fibrosis.html', label: 'Reverse Established Fibrosis' },
    { section: 'Reference' },
    { href: 'therapies.html', label: 'Therapy &amp; Target Catalog' },
    { href: 'open-questions.html', label: 'Open Questions' },
    { href: 'glossary.html', label: 'Glossary' },
    { href: 'references.html', label: 'References' },
    { section: 'Log' },
    { href: 'conversations.html', label: 'Conversations' },
    { href: 'changelog.html', label: 'Changelog' }
  ];

  var here = location.pathname.split('/').pop() || 'index.html';

  var html = '' +
    '<div class="brand"><span class="logo">🩺</span> IgAN Research Wiki</div>' +
    '<form class="search-box" onsubmit="return wikiSearchSubmit(event)">' +
    '<input type="search" id="navSearch" placeholder="Search the wiki…" aria-label="Search the wiki">' +
    '</form>';

  NAV.forEach(function (item) {
    if (item.section) {
      html += '<div class="nav-section">' + item.section + '</div>';
    } else {
      var active = item.href === here ? ' class="active"' : '';
      html += '<a href="' + item.href + '"' + active + '>' + item.label + '</a>';
    }
  });

  var nav = document.querySelector('nav.sidebar');
  if (nav) nav.innerHTML = html;

  // Reinforce scroll-to-anchor on initial load, in case layout shifted after
  // the browser's native jump. (Dynamic pages like the glossary do their own.)
  if (location.hash) {
    requestAnimationFrame(function () {
      var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el) el.scrollIntoView({ block: "start" });
    });
  }
})();

function wikiSearchSubmit(e) {
  e.preventDefault();
  var q = document.getElementById('navSearch').value.trim();
  location.href = 'search.html' + (q ? '?q=' + encodeURIComponent(q) : '');
  return false;
}
