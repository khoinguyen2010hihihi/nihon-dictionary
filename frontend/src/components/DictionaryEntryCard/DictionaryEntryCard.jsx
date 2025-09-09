import { useState } from "react";

const API = "http://127.0.0.1:8888";

/** Badge helper */
function Badge({ children, style = {} }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "9999px",
        padding: "4px 10px",
        fontSize: "12px",
        fontWeight: "500",
        border: "1px solid",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function getJlptBadgeStyle(level) {
  switch (level) {
    case "N5":
      return {
        backgroundColor: "#f0fdf4",
        color: "#166534",
        borderColor: "#bbf7d0",
      };
    case "N4":
      return {
        backgroundColor: "#ecfeff",
        color: "#0e7490",
        borderColor: "#a5f3fc",
      };
    case "N3":
      return {
        backgroundColor: "#fefce8",
        color: "#a16207",
        borderColor: "#fde047",
      };
    case "N2":
      return {
        backgroundColor: "#fff7ed",
        color: "#c2410c",
        borderColor: "#fed7aa",
      };
    case "N1":
      return {
        backgroundColor: "#fef2f2",
        color: "#dc2626",
        borderColor: "#fecaca",
      };
    default:
      return {
        backgroundColor: "#f8fafc",
        color: "#475569",
        borderColor: "#e2e8f0",
      };
  }
}

/** Search Result Card */
function SearchResultCard({ word }) {
  // Deduplicate meanings by content
  const uniqueMeanings =
    word.meanings?.reduce((acc, curr) => {
      if (!acc.find((m) => m.meaning === curr.meaning)) {
        acc.push(curr);
      }
      return acc;
    }, []) || [];

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        border: "1px solid #dbeafe",
        padding: "24px",
        marginBottom: "16px",
        // boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        transition: "all 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.15)";
        e.target.style.borderColor = "#93c5fd";
      }}
      onMouseLeave={(e) => {
        // e.target.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
        e.target.style.borderColor = "#dbeafe";
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "8px",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                fontFamily: "serif",
                color: "#1e293b",
                margin: 0,
                fontWeight: "normal",
              }}
            >
              {word.kanji || word.kana}
            </h3>
            {word.kanji && (
              <div
                style={{
                  fontSize: "18px",
                  color: "#2563eb",
                  fontWeight: "500",
                }}
              >
                {word.kana}
              </div>
            )}
          </div>

          {/* Badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {word.parts_of_speech && (
              <Badge
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#1d4ed8",
                  borderColor: "#bfdbfe",
                }}
              >
                {word.parts_of_speech}
              </Badge>
            )}
            {word.jlpt_level && (
              <Badge style={getJlptBadgeStyle(word.jlpt_level)}>
                JLPT {word.jlpt_level}
              </Badge>
            )}
          </div>
        </div>

        {/* ID Badge */}
        <Badge
          style={{
            backgroundColor: "#f1f5f9",
            color: "#475569",
            borderColor: "#e2e8f0",
          }}
        >
          #{word.id}
        </Badge>
      </div>

      {/* Meanings */}
      {uniqueMeanings.length > 0 && (
        <div>
          <h4
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#2563eb",
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              margin: "0 0 12px 0",
            }}
          >
            Nghĩa ({uniqueMeanings.length})
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {uniqueMeanings.map((meaning, idx) => (
              <li
                key={meaning.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#eff6ff",
                    color: "#2563eb",
                    fontSize: "12px",
                    fontWeight: "500",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "2px",
                  }}
                >
                  {idx + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      color: "#374151",
                      lineHeight: "1.6",
                      margin: 0,
                    }}
                  >
                    {meaning.meaning}
                  </p>
                  {meaning.example_sentence && (
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontStyle: "italic",
                        marginTop: "4px",
                        margin: "4px 0 0 0",
                      }}
                    >
                      Ví dụ: {meaning.example_sentence}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/** Loading state */
function LoadingState() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "#2563eb",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            border: "2px solid #bfdbfe",
            borderTopColor: "#2563eb",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <span style={{ fontWeight: "500" }}>Đang tìm kiếm...</span>
      </div>
      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

/** Empty state */
function EmptyState({ query }) {
  return (
    <div style={{ textAlign: "center", padding: "64px 0" }}>
      <div
        style={{
          width: "64px",
          height: "64px",
          margin: "0 auto 16px",
          backgroundColor: "#eff6ff",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "32px" }}>📖</span>
      </div>
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "500",
          color: "#374151",
          marginBottom: "8px",
          margin: "0 0 8px 0",
        }}
      >
        Không tìm thấy kết quả
      </h3>
      <p style={{ color: "#6b7280", margin: 0 }}>
        Không có từ nào phù hợp với "
        <span style={{ fontWeight: "500" }}>{query}</span>"
      </p>
    </div>
  );
}

/** Error state */
function ErrorState({ message }) {
  return (
    <div
      style={{
        backgroundColor: "#fef2f2",
        border: "1px solid #fecaca",
        borderRadius: "12px",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          margin: "0 auto 16px",
          backgroundColor: "#fee2e2",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "20px" }}>⚠️</span>
      </div>
      <h3
        style={{
          fontWeight: "500",
          color: "#b91c1c",
          marginBottom: "8px",
          margin: "0 0 8px 0",
        }}
      >
        Có lỗi xảy ra
      </h3>
      <p style={{ color: "#dc2626", fontSize: "14px", margin: 0 }}>{message}</p>
    </div>
  );
}

export default function SearchList() {
  const [q, setQ] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSearch = async () => {
    if (!q.trim()) return;

    setLoading(true);
    setErr("");
    setData(null);

    try {
      const res = await fetch(
        `${API}/api/search/?q=${encodeURIComponent(q.trim())}`,
        { headers: { Accept: "application/json" } }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      setErr(e.message || "Lỗi kết nối đến server");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle different response formats
  const items = Array.isArray(data) ? data : data?.results || [];
  const hasSearched = data !== null || err || loading;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: "1024px",
          margin: "0 auto",
          padding: "32px 16px",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#1e293b",
              marginBottom: "8px",
              margin: "0 0 8px 0",
            }}
          >
            Từ điển Nhật-Việt
          </h1>
          <p style={{ color: "#64748b", margin: 0 }}>
            Tìm kiếm từ vựng tiếng Nhật
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: "512px", margin: "0 auto 32px" }}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #bfdbfe",
              // boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập từ tiếng Nhật (kanji, hiragana, katakana)..."
              style={{
                flex: 1,
                padding: "12px 16px",
                fontSize: "18px",
                border: 0,
                outline: "none",
                backgroundColor: "transparent",
                color: "#1e293b",
              }}
              disabled={loading}
            />
            <button
              onClick={handleSearch}
              disabled={loading || !q.trim()}
              style={{
                padding: "12px 24px",
                backgroundColor: loading || !q.trim() ? "#93c5fd" : "#2563eb",
                color: "white",
                fontWeight: "500",
                border: 0,
                cursor: loading || !q.trim() ? "not-allowed" : "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!loading && q.trim()) {
                  e.target.style.backgroundColor = "#1d4ed8";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && q.trim()) {
                  e.target.style.backgroundColor = "#2563eb";
                }
              }}
            >
              {loading ? "Tìm..." : "Tìm kiếm"}
            </button>
          </div>
        </div>

        {/* Results */}
        <div>
          {loading && <LoadingState />}

          {err && <ErrorState message={err} />}

          {!loading && !err && items.length > 0 && (
            <div>
              {/* Results header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "#374151",
                    margin: 0,
                  }}
                >
                  Kết quả tìm kiếm
                </h2>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    backgroundColor: "#f1f5f9",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                  }}
                >
                  {items.length} từ
                </span>
              </div>

              {/* Results list */}
              <div>
                {items.map((word) => (
                  <SearchResultCard key={word.id} word={word} />
                ))}
              </div>
            </div>
          )}

          {!loading && !err && items.length === 0 && hasSearched && (
            <EmptyState query={q} />
          )}

          {!hasSearched && (
            <div style={{ textAlign: "center", padding: "64px 0" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  margin: "0 auto 16px",
                  backgroundColor: "#eff6ff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "32px" }}>🔍</span>
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px",
                  margin: "0 0 8px 0",
                }}
              >
                Bắt đầu tìm kiếm
              </h3>
              <p style={{ color: "#6b7280", margin: 0 }}>
                Nhập từ tiếng Nhật vào ô tìm kiếm để bắt đầu
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
