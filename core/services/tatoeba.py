import requests

BASE = "https://tatoeba.org/en/api_v0/search"

def search_examples(query: str, limit: int = 3) -> list[dict]:
    params = {
        "from": "jpn", "to": "eng", "query": query,
        "orphans": "no", "unapproved": "no",
        "trans_filter": "limit", "trans_to": "eng",
        "sort": "relevance", "page": 1, "limit": limit
    }
    r = requests.get(BASE, params=params, timeout=10)
    r.raise_for_status()
    data = r.json()
    out = []
    for item in data.get("results", []):
        jp = item.get("text") or item.get("sentence", {}).get("text")
        en = None
        for t in item.get("translations", []):
            lang = t.get("lang") or t.get("language")
            if (lang or "").startswith("en"):
                en = t.get("text") or t.get("sentence", {}).get("text")
                if en: break
        if jp and en:
            out.append({"id": item.get("id"), "jp": jp, "en": en})
        if len(out) >= limit:
            break
    return out
