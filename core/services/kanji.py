import requests

def fetch_kanji_detail(char: str) -> dict:
    url = f"https://kanjiapi.dev/v1/kanji/{char}"
    r = requests.get(url, timeout=8)
    r.raise_for_status()
    return r.json()
