// src/components/DictionarySearchAll.jsx
import React, { useState } from "react";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://127.0.0.1:8888";

export default function DictionaryEntryCard() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [addingToFlashcard, setAddingToFlashcard] = useState(new Set());

  const styles = {
    wrap: {
      maxWidth: 1000,
      margin: "0 auto",
      padding: "32px 20px",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8faff 0%, #e3f2fd 100%)",
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: 40,
    },
    title: {
      fontSize: 32,
      fontWeight: 800,
      color: "#1e3a8a",
      margin: "0 0 8px 0",
      letterSpacing: "-0.02em",
    },
    subtitle: {
      fontSize: 16,
      color: "#64748b",
      margin: 0,
    },
    searchContainer: {
      background: "white",
      borderRadius: 20,
      padding: 24,
      boxShadow: "0 4px 20px rgba(59, 130, 246, 0.08)",
      marginBottom: 32,
      border: "1px solid #e3f2fd",
    },
    searchRow: {
      display: "flex",
      gap: 12,
      alignItems: "stretch",
    },
    input: {
      flex: 1,
      padding: "16px 20px",
      border: "2px solid #e3f2fd",
      borderRadius: 16,
      fontSize: 16,
      background: "#fafbff",
      outline: "none",
      transition: "all 0.2s ease",
      fontFamily: "inherit",
      color: "#0f172a",
    },
    inputFocused: {
      borderColor: "#3b82f6",
      background: "#fff",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
    },
    btn: {
      padding: "16px 28px",
      border: "none",
      borderRadius: 16,
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      color: "#fff",
      fontWeight: 700,
      fontSize: 16,
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
    },
    btnHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 16px rgba(59, 130, 246, 0.4)",
    },
    btnDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
      transform: "none",
    },
    error: {
      color: "#dc2626",
      background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
      border: "1px solid #fecaca",
      padding: "16px 20px",
      borderRadius: 16,
      marginBottom: 20,
      fontSize: 15,
      fontWeight: 500,
    },
    noResults: {
      textAlign: "center",
      padding: "40px 20px",
      color: "#64748b",
      fontSize: 16,
    },
    card: {
      background: "white",
      borderRadius: 20,
      padding: 28,
      marginBottom: 20,
      boxShadow: "0 4px 20px rgba(59, 130, 246, 0.08)",
      border: "1px solid #e3f2fd",
      transition: "all 0.2s ease",
    },
    cardHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 32px rgba(59, 130, 246, 0.12)",
    },
    cardHeader: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      borderBottom: "2px solid #e3f2fd",
      paddingBottom: 20,
      marginBottom: 24,
      gap: 16,
    },
    cardHeaderContent: {
      flex: 1,
    },
    word: {
      fontSize: 36,
      fontWeight: 800,
      color: "#1e3a8a",
      margin: "0 0 8px 0",
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    kana: {
      fontSize: 18,
      color: "#3b82f6",
      fontWeight: 500,
      marginBottom: 16,
    },
    metaRow: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      height: 32,
      padding: "0 16px",
      borderRadius: 16,
      fontSize: 14,
      fontWeight: 700,
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      color: "white",
      boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
    },
    posBadge: {
      background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
      color: "#475569",
      border: "1px solid #cbd5e1",
      boxShadow: "0 2px 4px rgba(71, 85, 105, 0.1)",
    },
    addToFlashcardBtn: {
      padding: "12px 18px",
      borderRadius: 14,
      border: "2px solid #3b82f6",
      background: "white",
      color: "#3b82f6",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      gap: 8,
      whiteSpace: "nowrap",
      boxShadow: "0 2px 8px rgba(59, 130, 246, 0.15)",
    },
    addToFlashcardBtnHover: {
      background: "#3b82f6",
      color: "white",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
    },
    addToFlashcardBtnAdding: {
      opacity: 0.7,
      cursor: "not-allowed",
      transform: "none",
    },
    addToFlashcardBtnSuccess: {
      background: "#16a34a",
      borderColor: "#16a34a",
      color: "white",
      boxShadow: "0 2px 8px rgba(22, 163, 74, 0.3)",
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 700,
      color: "#1e3a8a",
      margin: "0 0 16px 0",
    },
    meaningList: {
      margin: 0,
      paddingLeft: 0,
      listStyle: "none",
    },
    meaningItem: {
      marginBottom: 20,
      padding: "16px 20px",
      background: "#fafbff",
      borderRadius: 12,
      border: "1px solid #e3f2fd",
    },
    meaningLine: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
    },
    meaningIdx: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 28,
      height: 28,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      color: "white",
      fontSize: 14,
      fontWeight: 700,
      flexShrink: 0,
    },
    meaningText: {
      fontSize: 17,
      color: "#0f172a",
      lineHeight: 1.6,
      fontWeight: 500,
    },
    exampleList: {
      margin: "16px 0 0 0",
      paddingLeft: 0,
      listStyle: "none",
    },
    exampleItem: {
      margin: "12px 0",
      padding: "12px 16px",
      background: "white",
      borderRadius: 8,
      border: "1px solid #e2e8f0",
    },
    exJp: {
      fontWeight: 600,
      fontSize: 16,
      color: "#1e3a8a",
      marginBottom: 4,
    },
    exEn: {
      color: "#64748b",
      fontSize: 15,
      lineHeight: 1.5,
    },
    pager: {
      display: "flex",
      gap: 16,
      justifyContent: "center",
      marginTop: 40,
    },
    pagerBtn: {
      padding: "12px 24px",
      borderRadius: 12,
      border: "1px solid #e3f2fd",
      background: "white",
      color: "#3b82f6",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontSize: 15,
    },
    pagerBtnHover: {
      background: "#3b82f6",
      color: "white",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
    },
  };

  const fetchUrl = async (url) => {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        const detail =
          json?.detail ||
          (json &&
            Object.entries(json)
              .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
              .join(" | "));
        throw new Error(detail || `${res.status} ${res.statusText}`);
      }

      const results = Array.isArray(json) ? json : json?.results || [];
      setItems(results);
      setNextUrl(json?.next || null);
      setPrevUrl(json?.previous || null);
    } catch (e) {
      setErr(e.message || "Lỗi gọi API");
      setItems([]);
      setNextUrl(null);
      setPrevUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = async (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    const url = `${API_BASE}/api/search/?q=${encodeURIComponent(q.trim())}`;
    fetchUrl(url);
  };

  const loadNext = () => nextUrl && fetchUrl(nextUrl);
  const loadPrev = () => prevUrl && fetchUrl(prevUrl);

  const addToFlashcard = async (entry) => {
    const entryId = entry.id;
    setAddingToFlashcard((prev) => new Set([...prev, entryId]));

    try {
      const res = await fetch(`${API_BASE}/api/flashcards/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          word_id: entryId,
          kanji: entry.kanji,
          kana: entry.kana,
          meanings: entry.meanings,
          parts_of_speech: entry.parts_of_speech,
          jlpt_level: entry.jlpt_level,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        const detail =
          json?.detail || json?.message || `${res.status} ${res.statusText}`;
        throw new Error(detail);
      }

      // Hiển thị trạng thái thành công trong 2 giây
      setTimeout(() => {
        setAddingToFlashcard((prev) => {
          const newSet = new Set(prev);
          newSet.delete(entryId);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      console.error("Error adding to flashcard:", error);
      alert(`Lỗi thêm vào flashcard: ${error.message}`);
      setAddingToFlashcard((prev) => {
        const newSet = new Set(prev);
        newSet.delete(entryId);
        return newSet;
      });
    }
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <h1 style={styles.title}>Từ điển Tiếng Nhật</h1>
        <p style={styles.subtitle}>Tra cứu từ vựng nhanh chóng và chính xác</p>
      </div>

      <div style={styles.searchContainer}>
        <div style={styles.searchRow}>
          <input
            style={styles.input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Nhập từ cần tra (vd: いいえ / いえ / nihon)"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSearch(e);
              }
            }}
            onFocus={(e) => Object.assign(e.target.style, styles.inputFocused)}
            onBlur={(e) => Object.assign(e.target.style, styles.input)}
          />
          <button
            style={{
              ...styles.btn,
              ...(loading ? styles.btnDisabled : {}),
            }}
            onClick={onSearch}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                Object.assign(e.target.style, {
                  ...styles.btn,
                  ...styles.btnHover,
                });
              }
            }}
            onMouseLeave={(e) => {
              Object.assign(e.target.style, {
                ...styles.btn,
                ...(loading ? styles.btnDisabled : {}),
              });
            }}
          >
            {loading ? "Đang tìm..." : "Tìm kiếm"}
          </button>
        </div>
      </div>

      {err && <div style={styles.error}>{err}</div>}

      {!loading && !err && items.length === 0 && q.trim() !== "" && (
        <div style={styles.noResults}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <div>Không tìm thấy kết quả phù hợp</div>
        </div>
      )}

      {items.map((entry) => {
        const title = entry.kanji || entry.kana || "—";
        const kana = entry.kana || "";
        const pos = entry.parts_of_speech || "";
        const jlpt = entry.jlpt_level || "";
        const isAdding = addingToFlashcard.has(entry.id);

        return (
          <article
            key={entry.id}
            style={styles.card}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, {
                ...styles.card,
                ...styles.cardHover,
              })
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, styles.card)
            }
          >
            <header style={styles.cardHeader}>
              <div style={styles.cardHeaderContent}>
                <h2 style={styles.word}>{title}</h2>
                {kana && <div style={styles.kana}>{kana}</div>}

                <div style={styles.metaRow}>
                  {jlpt && <span style={styles.badge}>JLPT {jlpt}</span>}
                  {pos && (
                    <span style={{ ...styles.badge, ...styles.posBadge }}>
                      {pos}
                    </span>
                  )}
                </div>
              </div>

              <button
                style={{
                  ...styles.addToFlashcardBtn,
                  ...(isAdding ? styles.addToFlashcardBtnSuccess : {}),
                }}
                onClick={() => addToFlashcard(entry)}
                disabled={isAdding}
                onMouseEnter={(e) => {
                  if (!isAdding) {
                    Object.assign(e.target.style, {
                      ...styles.addToFlashcardBtn,
                      ...styles.addToFlashcardBtnHover,
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.target.style, {
                    ...styles.addToFlashcardBtn,
                    ...(isAdding ? styles.addToFlashcardBtnSuccess : {}),
                  });
                }}
              >
                {isAdding ? (
                  <>
                    <span style={{ fontSize: 16 }}>✓</span>
                    <span>Đã thêm</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>+</span>
                    <span>Flashcard</span>
                  </>
                )}
              </button>
            </header>

            <section>
              <h3 style={styles.sectionTitle}>Nghĩa của từ</h3>
              <ol style={styles.meaningList}>
                {(entry.meanings || []).map((m, idx) => (
                  <li key={m.id ?? idx} style={styles.meaningItem}>
                    <div style={styles.meaningLine}>
                      <span style={styles.meaningIdx}>{idx + 1}</span>
                      <span style={styles.meaningText}>{m.meaning || "—"}</span>
                    </div>

                    {Array.isArray(m.examples) && m.examples.length > 0 && (
                      <ul style={styles.exampleList}>
                        {m.examples.map((ex) => (
                          <li key={ex.id} style={styles.exampleItem}>
                            <div style={styles.exJp}>{ex.jp}</div>
                            <div style={styles.exEn}>{ex.en}</div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          </article>
        );
      })}

      {(prevUrl || nextUrl) && (
        <div style={styles.pager}>
          {prevUrl && (
            <button
              style={styles.pagerBtn}
              onClick={loadPrev}
              onMouseEnter={(e) =>
                Object.assign(e.target.style, {
                  ...styles.pagerBtn,
                  ...styles.pagerBtnHover,
                })
              }
              onMouseLeave={(e) =>
                Object.assign(e.target.style, styles.pagerBtn)
              }
            >
              ← Trang trước
            </button>
          )}
          {nextUrl && (
            <button
              style={styles.pagerBtn}
              onClick={loadNext}
              onMouseEnter={(e) =>
                Object.assign(e.target.style, {
                  ...styles.pagerBtn,
                  ...styles.pagerBtnHover,
                })
              }
              onMouseLeave={(e) =>
                Object.assign(e.target.style, styles.pagerBtn)
              }
            >
              Trang sau →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
