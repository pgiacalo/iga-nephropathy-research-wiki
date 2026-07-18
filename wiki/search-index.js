// Static search index for the wiki (offline; no server/fetch needed).
// MAINTENANCE: when you add or substantially change a page, add/update its
// entry here so it is findable. `text` should hold keywords + a short summary.
var SEARCH_INDEX = [
  {
    title: "Home",
    url: "index.html",
    text: "IgA nephropathy Berger's disease overview two aims prevention reversal Gd-IgA1 malformed protein research wiki hub"
  },
  {
    title: "Disease Mechanism — The 4-Hit Model",
    url: "mechanism.html",
    text: "four hit model Gd-IgA1 galactose-deficient IgA1 GalNAc anti-glycan autoantibodies immune complexes mesangium deposition complement alternative lectin pathway glomerulosclerosis interstitial fibrosis APRIL BAFF C1GALT1 Cosmc mucosal immunity Peyer's patches"
  },
  {
    title: "Aim 1 · Prevent / Fix Gd-IgA1",
    url: "aim-prevention.html",
    text: "prevention fix malformed protein Gd-IgA1 upstream APRIL inhibitors sibeprenlimab zigakibart BION-1301 BAFF telitacicept atacicept Nefecon Tarpeyo budesonide mucosal gut C1GALT1 Cosmc glycosylation B cell plasma cell"
  },
  {
    title: "Aim 2 · Reverse Damage",
    url: "aim-reversal.html",
    text: "reversal reverse kidney damage complement inhibition iptacopan factor B narsoplimab MASP-2 lectin pegcetacoplan C3 cemdisiran C5 sparsentan endothelin SGLT2 dapagliflozin RAAS ACE ARB fibrosis proteinuria eGFR"
  },
  {
    title: "Fix the Gd-IgA1 Glycosylation Defect (Hard Problem)",
    url: "hardproblem-glycosylation.html",
    text: "C1GALT1 Cosmc galactosyltransferase glycosylation defect correct restore galactosylation IL-6 IL-4 cytokine epigenetic GWAS genetic microbiome biomarker serum Gd-IgA1 root cause under-drugged"
  },
  {
    title: "Reverse Established Fibrosis (Hard Problem)",
    url: "hardproblem-fibrosis.html",
    text: "kidney fibrosis reversal regression glomerulosclerosis interstitial fibrosis myofibroblast TGF-beta pericyte EMT tubular podocyte repair regeneration antifibrotic nephron"
  },
  {
    title: "Therapy & Target Catalog",
    url: "therapies.html",
    text: "drug catalog targets status phase approved sibeprenlimab zigakibart telitacicept atacicept Nefecon iptacopan narsoplimab pegcetacoplan cemdisiran sparsentan dapagliflozin ACE ARB APRIL BAFF complement"
  },
  {
    title: "Open Questions & Research Backlog",
    url: "open-questions.html",
    text: "open questions hypotheses backlog C1GALT1 Cosmc correctable APRIL durability rebound complement pathway biomarker fibrosis reversible combination therapy in silico protein design"
  },
  {
    title: "Glossary",
    url: "glossary.html",
    text: "glossary terms abbreviations IgAN Gd-IgA1 GalNAc C1GALT1 Cosmc APRIL BAFF mesangium complement MASP-2 RAAS eGFR proteinuria definitions"
  },
  {
    title: "References",
    url: "references.html",
    text: "references sources links PubMed ClinicalTrials.gov FDA UniProt AlphaFold citations by conversation verification"
  },
  {
    title: "Conversations Log",
    url: "conversations.html",
    text: "conversations dated chronological index log kickoff mechanism landscape wiki setup"
  },
  {
    title: "Changelog",
    url: "changelog.html",
    text: "changelog history of changes to the wiki updates additions"
  }
];
