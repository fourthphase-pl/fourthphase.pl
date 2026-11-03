#!/usr/bin/env python3
"""Kontrola strony po każdej zmianie treści (uruchamia ją GitHub Actions, można też lokalnie:
python3 tools/check_site.py). Nie wymaga żadnych dodatkowych bibliotek.

BŁĄD przerywa kontrolę i GitHub wyśle e-mail do osoby, która zapisała zmianę.
UWAGA nie przerywa niczego, to wskazówka (np. treść robocza do uzupełnienia)."""
import json
import os
import re
import sys
from html import unescape
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = ["index.html", "polityka-prywatnosci.html", "404.html"]
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
REQUIRED_IDS = {
    "index.html": ["top", "main", "oferta", "faq", "wycena", "quote", "q-name", "q-company", "q-email", "q-phone",
                   "q-msg", "q-submit", "q-error", "q-ok", "cookie-settings"],
    "polityka-prywatnosci.html": ["main", "cookies", "cookie-settings"],
}
REQUIRED_FILES = ["index.html", "polityka-prywatnosci.html", "404.html", "styles.css", "app.js", "config.js",
                  "js/carbon.js", "robots.txt"]
REQUIRED_TAGS = ['href="styles.css"', 'src="js/carbon.js"', 'src="config.js"', 'src="app.js"']

errors, warnings = [], []
all_tels, all_mails = set(), set()
ci = os.environ.get("GITHUB_ACTIONS") == "true"


def report(kind, page, line, msg):
    where = page + (":%d" % line if line else "")
    (errors if kind == "error" else warnings).append("%s: %s" % (where, msg))
    if ci:
        print("::%s file=%s%s::%s" % ("error" if kind == "error" else "warning", page,
                                                 (",line=%d" % line) if line else "", msg))
    else:
        print(("BŁĄD" if kind == "error" else "UWAGA") + " " + where + ": " + msg)


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.ids, self.links, self.imgs = [], set(), [], []
        self.tags_unclosed, self.h1 = [], 0
        self.title, self.desc, self.ld, self.text = "", "", [], []
        self.problems = []
        self._in = None  # script/style/title

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        line = self.getpos()[0]
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "h1":
            self.h1 += 1
        if tag == "meta" and a.get("name") == "description":
            self.desc = a.get("content", "")
        if tag in ("a", "cds-button", "link") and a.get("href"):
            self.links.append((a["href"], line))
        if tag in ("img", "script") and a.get("src"):
            self.links.append((a["src"], line))
        if tag == "img":
            self.imgs.append((a.get("alt"), a.get("src", ""), line))
        if tag == "script":
            self._in = "ld" if a.get("type") == "application/ld+json" else "script"
            self._buf = []
        elif tag in ("style", "title"):
            self._in = tag
            self._buf = []
        if tag not in VOID:
            self.stack.append((tag, line))

    def handle_startendtag(self, tag, attrs):
        # <x /> bez zawartości: nie wkładamy na stos
        self.handle_starttag(tag, attrs)
        if tag not in VOID and self.stack and self.stack[-1][0] == tag:
            self.stack.pop()

    def handle_endtag(self, tag):
        line = self.getpos()[0]
        if self._in and tag in ("script", "style", "title"):
            data = "".join(self._buf)
            if self._in == "ld":
                self.ld.append((data, line))
            elif self._in == "title":
                self.title = data.strip()
            self._in = None
        if tag in VOID:
            return
        names = [t for t, _ in self.stack]
        if tag not in names:
            self.problems.append((line, "Znacznik zamykający </%s> nie ma pasującego otwarcia." % tag))
            return
        while self.stack and self.stack[-1][0] != tag:
            t, l = self.stack.pop()
            self.problems.append((l, "Znacznik <%s> nie został zamknięty (brak </%s> przed linią %d)." % (t, t, line)))
        self.stack.pop()

    def handle_data(self, data):
        if self._in:
            self._buf.append(data)
        else:
            self.text.append(data)

    def close(self):
        super().close()
        for t, l in self.stack:
            self.problems.append((l, "Znacznik <%s> nie został zamknięty." % t))


def parse(name):
    p = Page()
    p.feed((ROOT / name).read_text(encoding="utf-8"))
    p.close()
    return p


for f in REQUIRED_FILES:
    if not (ROOT / f).exists():
        report("error", f, 0, "Brakuje pliku, który strona wymaga.")

pages = {}
for name in PAGES:
    if not (ROOT / name).exists():
        continue
    raw = (ROOT / name).read_text(encoding="utf-8")
    p = parse(name)
    pages[name] = p
    for line, msg in p.problems:
        report("error", name, line, msg)

    if name != "404.html":
        for tag in REQUIRED_TAGS:
            if tag not in raw:
                report("error", name, 0, "Brakuje wymaganego elementu: %s." % tag)
        if p.h1 != 1:
            report("error", name, 0, "Strona powinna mieć dokładnie jeden nagłówek <h1>, a ma %d." % p.h1)
        if not p.title:
            report("error", name, 0, "Brakuje tytułu strony <title>.")
        elif len(p.title) > 65:
            report("warning", name, 0, "Tytuł ma %d znaków. Google skraca powyżej ok. 60." % len(p.title))
        if not p.desc:
            report("error", name, 0, "Brakuje opisu strony (meta description).")
        elif not 70 <= len(p.desc) <= 160:
            report("warning", name, 0, "Opis ma %d znaków. Najlepiej 70 do 160." % len(p.desc))
        for rid in REQUIRED_IDS.get(name, []):
            if rid not in p.ids:
                report("error", name, 0, 'Brakuje elementu z id="%s". Strona lub formularz przestaną działać.' % rid)

    for alt, src, line in p.imgs:
        if alt is None:
            report("error", name, line, "Obraz %s nie ma opisu alt (potrzebny dla dostępności i SEO)." % src)

    for data, line in p.ld:
        try:
            ld = json.loads(data)
        except ValueError as e:
            report("error", name, line, "Dane strukturalne (JSON-LD) są niepoprawne: %s." % e)
            continue
        ld_tel = ld.get("telephone") if isinstance(ld, dict) else None
        link_tels = {h[4:] for h, _ in p.links if h.startswith("tel:")}
        if ld_tel and link_tels and ld_tel.replace(" ", "") not in link_tels:
            report("error", name, line, "Numer telefonu w danych dla wyszukiwarek (%s) różni się od numeru w linkach (%s)." % (ld_tel, ", ".join(sorted(link_tels))))

    # linki i pliki
    for href, line in p.links:
        if re.match(r"^(https?:|mailto:|tel:|//|data:|javascript:)", href):
            continue
        path, _, frag = href.partition("#")
        path = path.split("?")[0]
        if path.startswith("/"):
            path = path[1:]
        if path == "":
            if frag and frag not in p.ids:
                report("error", name, line, 'Link #%s prowadzi do nieistniejącego miejsca (brak elementu z id="%s").' % (frag, frag))
            continue
        target = ROOT / path
        if not target.exists():
            report("error", name, line, "Link lub plik %s nie istnieje." % href)
        elif frag and path.endswith(".html"):
            other = parse(path)
            if frag not in other.ids:
                report("error", name, line, 'Link %s prowadzi do nieistniejącego miejsca (brak id="%s").' % (href, frag))

    # numer telefonu i e-mail spójne w całej stronie
    text = " ".join(p.text)
    tels = {h[4:] for h, _ in p.links if h.startswith("tel:")}
    mails = {h[7:] for h, _ in p.links if h.startswith("mailto:")}
    all_tels.update(tels)
    all_mails.update(mails)
    if len(tels) > 1:
        report("error", name, 0, "Linki telefonu mają różne numery: %s." % ", ".join(sorted(tels)))
    if len(mails) > 1:
        report("error", name, 0, "Linki e-mail mają różne adresy: %s." % ", ".join(sorted(mails)))
    for m in set(re.findall(r"\+48[\d ]{9,15}", text)):
        digits = "+" + re.sub(r"\D", "", m)
        if tels and digits not in tels:
            report("warning", name, 0, "Numer %s w tekście różni się od numeru w linku tel:%s." % (m.strip(), next(iter(tels))))

    # wskazówki o treści
    if "do uzupełnienia" in text:
        report("warning", name, 0, "Strona nadal zawiera tekst roboczy „do uzupełnienia”.")
    if re.search("[—–]", text):
        report("warning", name, 0, "W tekście jest myślnik (— lub –). W tym projekcie zastępujemy go dwukropkiem, przecinkiem lub kropką.")

if len(all_tels) > 1:
    report("error", "index.html", 0, "Strony mają różne numery telefonu w linkach: %s." % ", ".join(sorted(all_tels)))
if len(all_mails) > 1:
    report("error", "index.html", 0, "Strony mają różne adresy e-mail w linkach: %s." % ", ".join(sorted(all_mails)))

# FAQ: każde pytanie ma tytuł i odpowiedź
if "index.html" in pages:
    raw = (ROOT / "index.html").read_text(encoding="utf-8")
    raw = re.sub(r"<!--.*?-->", lambda c: "\n" * c.group(0).count("\n"), raw, flags=re.S)  # pomijamy komentarze
    for m in re.finditer(r'<cds-accordion-item\b([^>]*)>(.*?)</cds-accordion-item>', raw, re.S):
        title = re.search(r'title="([^"]*)"', m.group(1))
        line = raw.count("\n", 0, m.start()) + 1
        if not title or not title.group(1).strip():
            report("error", "index.html", line, "Pytanie w FAQ nie ma tytułu.")
        if not re.sub(r"<[^>]+>", "", m.group(2)).strip():
            report("error", "index.html", line, "Pytanie w FAQ nie ma odpowiedzi.")

# konfiguracja nie może zawierać niewypełnionych miejsc
cfg = ROOT / "config.js"
if cfg.exists() and "WKLEJ_" in cfg.read_text(encoding="utf-8"):
    report("warning", "config.js", 0, "W config.js został niewypełniony klucz (WKLEJ_...). Formularz lub analityka nie będą działać.")

print("\nKontrola zakończona: %d błędów, %d uwag." % (len(errors), len(warnings)))
sys.exit(1 if errors else 0)
