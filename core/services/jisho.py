import requests

BASE = "https://jisho.org/api/v1/search/words"

def jisho_search(keyword: str) -> dict:
    r = requests.get(BASE, params={"keyword": keyword}, timeout=10)
    r.raise_for_status()
    return r.json()
