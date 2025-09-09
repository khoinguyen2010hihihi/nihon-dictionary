import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaChevronLeft,
  FaChevronRight,
  FaSync,
} from "react-icons/fa";
import "./FlashcardsPage.css";

const API = import.meta?.env?.VITE_API_BASE || "http://127.0.0.1:8888";

export default function FlashcardsPage() {
  const [params] = useSearchParams();
  const q = params.get("q") || ""; // từ khóa tìm flashcards
  const access = localStorage.getItem("access"); // nếu bạn muốn yêu cầu login để favorite
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [items, setItems] = useState([]); // danh sách flashcards (từ API)
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [favoritedIds, setFavoritedIds] = useState(new Set());

  // (Tuỳ chọn) chặn vào nếu chưa đăng nhập:
  // nếu muốn cho học không cần login, hãy bỏ đoạn Navigate này.
  // if (!access) return <Navigate to="/login" replace />;

  const current = items[idx];
  const progress = items.length ? ((idx + 1) / items.length) * 100 : 0;

  const fetchData = useCallback(async () => {
    if (!q.trim()) return;
    setLoading(true);
    setErr("");
    setItems([]);
    setIdx(0);
    setFlipped(false);
    try {
      const res = await fetch(`${API}/api/search/?q=${encodeURIComponent(q)}`, {
        headers: { Accept: "application/json" },
      });
      const json = await res.json();
      const results = Array.isArray(json) ? json : json?.results || [];
      // Flashcard chuẩn hoá: mỗi item {id, front, backs[]}
      const norm = results
        .map((w) => ({
          id: w.id,
          front: w.kanji || w.kana,
          sub: w.kana || "",
          pos: w.parts_of_speech || "",
          jlpt: w.jlpt_level || "",
          backs: (w.meanings || []).map((m) => m.meaning).filter(Boolean),
        }))
        .filter((it) => it.front && it.backs.length);
      setItems(norm);
    } catch (e) {
      setErr(e.message || "Lỗi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Điều hướng thẻ
  const next = useCallback(() => {
    setFlipped(false);
    setIdx((i) => (i + 1 < items.length ? i + 1 : i));
  }, [items.length]);

  const prev = useCallback(() => {
    setFlipped(false);
    setIdx((i) => (i - 1 >= 0 ? i - 1 : i));
  }, []);

  const flip = useCallback(() => setFlipped((f) => !f), []);

  // Favorite (cần access)
  const toggleFavorite = useCallback(async () => {
    if (!access || !current) return;
    try {
      const res = await fetch(`${API}/api/toggle-favorite/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({ word_id: current.id }),
      });
      const data = await res.json();
      // API trả { favorited: true/false }
      setFavoritedIds((prev) => {
        const copy = new Set(prev);
        if (data?.favorited) copy.add(current.id);
        else copy.delete(current.id);
        return copy;
      });
    } catch (e) {
      console.error("Toggle favorite lỗi:", e);
    }
  }, [API, access, current]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        flip();
      } else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key.toLowerCase() === "f") toggleFavorite();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flip, next, prev, toggleFavorite]);

  const isFavorited = current ? favoritedIds.has(current.id) : false;

  return (
    <div className="fc-container">
      <div className="fc-topbar">
        <h2>Flashcards {q ? `· "${q}"` : ""}</h2>
        <div className="fc-actions">
          <button className="btn" onClick={fetchData} title="Tải lại">
            <FaSync /> Tải lại
          </button>
        </div>
      </div>

      {loading && <div className="fc-state">Đang tải…</div>}
      {err && <div className="fc-state fc-error">{err}</div>}
      {!loading && !err && items.length === 0 && q && (
        <div className="fc-state">Không có thẻ phù hợp.</div>
      )}
      {!q && (
        <div className="fc-state">
          Hãy truyền query, ví dụ: <code>/flashcards?q=nihon</code>
        </div>
      )}

      {current && (
        <>
          <div className="fc-progress">
            <div className="bar" style={{ width: `${progress}%` }} />
            <div className="label">
              {idx + 1}/{items.length}
            </div>
          </div>

          <div className={`fc-card ${flipped ? "flipped" : ""}`} onClick={flip}>
            <div className="face front">
              <div className="front-title">{current.front}</div>
              <div className="front-sub">
                {current.sub}
                {current.pos && <> · {current.pos}</>}
                {current.jlpt && <> · JLPT {current.jlpt}</>}
              </div>
              <div className="hint">(Bấm để lật · Space)</div>
            </div>

            <div className="face back">
              <ul>
                {current.backs.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="hint">(Bấm để lật lại)</div>
            </div>
          </div>

          <div className="fc-controls">
            <button className="nav" onClick={prev} disabled={idx === 0}>
              <FaChevronLeft /> Trước
            </button>
            <button
              className={`fav ${isFavorited ? "on" : ""}`}
              onClick={toggleFavorite}
              title="Yêu thích (F)"
            >
              {isFavorited ? <FaHeart /> : <FaRegHeart />}{" "}
              {isFavorited ? "Đã thích" : "Yêu thích"}
            </button>
            <button
              className="nav"
              onClick={next}
              disabled={idx + 1 >= items.length}
            >
              Sau <FaChevronRight />
            </button>
          </div>

          <div className="fc-tips">
            Phím tắt: <kbd>←</kbd> / <kbd>→</kbd> · <kbd>Space</kbd> ·{" "}
            <kbd>F</kbd>
          </div>
        </>
      )}
    </div>
  );
}
