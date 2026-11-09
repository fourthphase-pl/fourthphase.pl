#!/usr/bin/env python3
"""Generuje elementy SEO, które zależą od treści strony, żeby nie rozjeżdżały się po edycji tekstów:
  1. dane FAQ dla wyszukiwarek (FAQPage, JSON-LD) wstawiane do index.html między znaczniki SEO:FAQ,
  2. llms.txt (streszczenie strony dla asystentów AI),
  3. sitemap.xml.
Uruchamia się automatycznie po każdej zmianie (GitHub Actions), lokalnie: python3 tools/build_seo.py.
Nie wymaga żadnych dodatkowych bibliotek."""
import datetime
import json
import re
import subprocess
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE_URL = "https://fourthphase.pl/"
PAGES = ["index.html", "polityka-prywatnosci.html"]
PLACEHOLDER = "do uzupełnienia"


def strip_comments(s):
    return re.sub(r"<!--.*?-->", "", s, flags=re.S)


def text(fragment):
    return re.sub(r"\s+", " ", unescape(re.sub(r"<[^>]+>", "", fragment))).strip()


def section(raw, name):
    """Fragment strony między komentarzem 'SEKCJA: <name>' a następną sekcją."""
    m = re.search(r"<!-- ===== SEKCJA: " + re.escape(name) + r".*?-->(.*?)(?=<!-- ===== SEKCJA:|</main>)", raw, re.S)
    return strip_comments(m.group(1)) if m else ""


def write_if_changed(path, content):
    if path.exists() and path.read_text(encoding="utf-8") == content:
        return False
    path.write_text(content, encoding="utf-8")
    print("Zaktualizowano:", path.name)
    return True


# ---------- 1. FAQ JSON-LD ----------
def faq_items(raw):
    body = strip_comments(raw)
    items = []
    for m in re.finditer(r'<cds-accordion-item\b[^>]*?title="([^"]*)"[^>]*>(.*?)</cds-accordion-item>', body, re.S):
        q, a = text(m.group(1)), text(m.group(2))
        if q and a:
            items.append((q, a))
    return items


def faq_block(items):
    if not items:
        return ""
    data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in items
        ],
    }
    body = json.dumps(data, ensure_ascii=False, indent=2).replace("</", "<\\/")
    return '<script type="application/ld+json">\n' + body + "\n</script>"


def update_faq(raw):
    pattern = re.compile(r"(<!-- SEO:FAQ:START[^>]*-->)(.*?)(<!-- SEO:FAQ:END -->)", re.S)
    if not pattern.search(raw):
        print("UWAGA: w index.html brakuje znaczników SEO:FAQ, dane FAQ nie zostały dodane.")
        return raw
    block = faq_block(faq_items(raw))
    return pattern.sub(lambda m: m.group(1) + "\n" + (block + "\n" if block else "") + m.group(3), raw, count=1)


# ---------- 2. llms.txt ----------
def build_llms(raw):
    body = strip_comments(raw)
    ld = json.loads(re.search(r'<script type="application/ld\+json">\s*(\{.*?\})\s*</script>', body, re.S).group(1))
    desc = re.search(r'<meta name="description" content="([^"]*)"', body).group(1)
    h1 = text(re.search(r"<h1[^>]*>(.*?)</h1>", body, re.S).group(1))
    lead = re.search(r'<p class="hero-lead">(.*?)</p>', body, re.S)
    out = ["# " + ld["name"], "", "> " + unescape(desc), "", h1 + (" " + text(lead.group(1)) if lead else ""), ""]

    firma = section(raw, "O firmie")
    paras = [text(p) for p in re.findall(r'<p class="serif"[^>]*>(.*?)</p>', firma, re.S)]
    if paras:
        out += ["## O firmie", ""] + [p + "\n" for p in paras]

    why = section(raw, "Dlaczego teraz")
    why_label = re.search(r'<p class="label">(.*?)</p>', why, re.S)
    pairs = re.findall(r'<p class="h3">(.*?)</p>\s*<p class="small">(.*?)</p>', why, re.S)
    if pairs:
        out += ["## " + (text(why_label.group(1)) if why_label else "Dlaczego my"), ""] + ["- **%s**: %s" % (text(a), text(b)) for a, b in pairs] + [""]

    who = section(raw, "Dla kogo pracujemy")
    blocks = re.findall(r'<div class="audience">(.*?)</ul>', who, re.S)
    rows = []
    for b in blocks:
        if PLACEHOLDER in b:
            continue
        eyebrow = re.search(r'<p class="eyebrow">(.*?)</p>', b, re.S)
        h3 = re.search(r"<h3[^>]*>(.*?)</h3>", b, re.S)
        lis = [text(x) for x in re.findall(r"<li>(.*?)</li>", b, re.S)]
        if eyebrow and h3:
            rows.append("### %s\n\n%s\n\n%s\n" % (text(eyebrow.group(1)), text(h3.group(1)), "\n".join("- " + x for x in lis)))
    if rows:
        out += ["## Dla kogo pracujemy", ""] + rows

    offer = section(raw, "Co budujemy")
    items = re.findall(r'<h3 class="h3">(.*?)</h3><p class="muted">(.*?)</p>', offer, re.S)
    if items:
        out += ["## Co budujemy", ""] + ["- **%s**: %s" % (text(a), text(b)) for a, b in items] + [""]

    quality = section(raw, "Jakość")
    qh = re.search(r"<h2[^>]*>(.*?)</h2>", quality, re.S)
    ql = re.search(r'<p class="lead">(.*?)</p>', quality, re.S)
    checks = [text(x) for x in re.findall(r"<li>(.*?)</li>", quality, re.S)]
    if qh:
        out += ["## Jakość i dokumentacja", "", text(qh.group(1)) + ("." if not text(qh.group(1)).endswith(".") else "")]
        if ql:
            out += ["", text(ql.group(1))]
        out += [""] + ["- " + x for x in checks] + [""]

    faq = faq_items(raw)
    if faq:
        out += ["## Najczęstsze pytania", ""]
        for q, a in faq:
            out += ["**%s**" % q, a, ""]

    addr = ld.get("address", {})
    nip = re.search(r"NIP\s*(\d+)", body)
    krs = re.search(r"KRS\s*(\d+)", body)
    regon = re.search(r"REGON\s*(\d+)", body)
    tel = ld.get("telephone", "")
    tm = re.match(r"^\+48(\d{3})(\d{3})(\d{3})$", tel)
    if tm:
        tel = "+48 %s %s %s" % tm.groups()
    out += ["## Kontakt", "", "- Telefon: " + tel, "- E-mail: " + ld.get("email", "")]
    if addr:
        out.append("- Adres: %s, %s %s" % (addr.get("streetAddress", ""), addr.get("postalCode", ""), addr.get("addressLocality", "")))
    reg = [x for x in (("NIP " + nip.group(1)) if nip else "", ("KRS " + krs.group(1)) if krs else "",
                       ("REGON " + regon.group(1)) if regon else "") if x]
    if reg:
        out.append("- Dane rejestrowe: " + ", ".join(reg))
    out += ["", "## Strony", "", "- [Strona główna](%s)" % SITE_URL,
            "- [Polityka prywatności](%spolityka-prywatnosci.html)" % SITE_URL, ""]
    return "\n".join(out)


# ---------- 3. sitemap.xml ----------
def last_modified(name):
    try:
        d = subprocess.run(["git", "log", "-1", "--format=%cs", "--", name], cwd=str(ROOT), capture_output=True,
                           text=True, timeout=20).stdout.strip()
        if re.match(r"^\d{4}-\d{2}-\d{2}$", d):
            return d
    except Exception:
        pass
    return datetime.date.today().isoformat()


def build_sitemap():
    rows = []
    for name in PAGES:
        url = SITE_URL if name == "index.html" else SITE_URL + name
        rows.append("  <url>\n    <loc>%s</loc>\n    <lastmod>%s</lastmod>\n  </url>" % (url, last_modified(name)))
    return ('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            + "\n".join(rows) + "\n</urlset>\n")


if __name__ == "__main__":
    index = ROOT / "index.html"
    raw = index.read_text(encoding="utf-8")
    write_if_changed(index, update_faq(raw))
    raw = index.read_text(encoding="utf-8")
    write_if_changed(ROOT / "llms.txt", build_llms(raw))
    write_if_changed(ROOT / "sitemap.xml", build_sitemap())
    print("Generowanie SEO zakończone.")
