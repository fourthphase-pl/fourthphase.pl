#!/usr/bin/env python3
"""Po każdej publikacji informuje wyszukiwarki obsługujące IndexNow (m.in. Bing) o adresach ze strony,
żeby szybciej trafiły do indeksu. Uruchamia ją workflow po udanej publikacji. Błąd tego kroku nie zatrzymuje niczego.
Klucz to nazwa pliku <32 znaki szesnastkowe>.txt w katalogu głównym (plik zawiera ten sam klucz; jest publiczny z założenia)."""
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HOST = "fourthphase.pl"

keys = [p.stem for p in ROOT.glob("*.txt") if re.fullmatch(r"[0-9a-f]{32}", p.stem)]
if not keys:
    print("IndexNow: brak pliku z kluczem, pomijam.")
    sys.exit(0)
key = keys[0]
urls = re.findall(r"<loc>([^<]+)</loc>", (ROOT / "sitemap.xml").read_text(encoding="utf-8"))
payload = {"host": HOST, "key": key, "keyLocation": "https://%s/%s.txt" % (HOST, key), "urlList": urls}
if os.environ.get("GITHUB_ACTIONS") != "true" and "--send" not in sys.argv:
    print("IndexNow (próba, nic nie wysyłam): %d adresów, klucz %s. Dodaj --send, żeby wysłać." % (len(urls), key))
    sys.exit(0)
req = urllib.request.Request("https://api.indexnow.org/indexnow", data=json.dumps(payload).encode("utf-8"),
                             headers={"Content-Type": "application/json; charset=utf-8"}, method="POST")
try:
    with urllib.request.urlopen(req, timeout=30) as r:
        print("IndexNow: wysłano %d adresów, odpowiedź %s." % (len(urls), r.status))
except Exception as e:  # nie przerywamy publikacji
    print("IndexNow: nie udało się wysłać (%s). Pomijam." % e)
