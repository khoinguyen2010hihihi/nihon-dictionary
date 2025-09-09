import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://127.0.0.1:8888";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  // Enhanced styling with white and blue theme
  const ui = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      padding: "40px 16px",
      fontFamily:
        "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    },
    container: {
      maxWidth: 900,
      margin: "0 auto",
    },
    header: {
      background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
      borderRadius: 24,
      padding: "32px 40px",
      marginBottom: 32,
      boxShadow:
        "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)",
      position: "relative",
      overflow: "hidden",
    },
    headerBg: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "200px",
      height: "200px",
      background:
        "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
      borderRadius: "50%",
      transform: "translate(60px, -60px)",
    },
    headerContent: {
      position: "relative",
      zIndex: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 20,
    },
    title: {
      margin: 0,
      fontSize: 32,
      fontWeight: 700,
      color: "#ffffff",
      letterSpacing: "-0.025em",
      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    subtitle: {
      color: "rgba(255,255,255,0.8)",
      fontSize: 16,
      marginTop: 4,
      fontWeight: 400,
    },
    card: {
      background: "#ffffff",
      border: "1px solid rgba(59, 130, 246, 0.08)",
      borderRadius: 24,
      padding: 0,
      boxShadow:
        "0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255,255,255,0.05)",
      overflow: "hidden",
      backdropFilter: "blur(10px)",
    },
    cardHeader: {
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      padding: "24px 32px",
      borderBottom: "1px solid rgba(59, 130, 246, 0.08)",
    },
    cardTitle: {
      margin: 0,
      fontSize: 20,
      fontWeight: 600,
      color: "#1e40af",
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
    cardBody: {
      padding: "8px 0",
    },
    row: {
      display: "grid",
      gridTemplateColumns: "200px 1fr",
      gap: 20,
      padding: "20px 32px",
      borderBottom: "1px solid rgba(59, 130, 246, 0.06)",
      transition: "background-color 0.2s ease",
      ":hover": {
        backgroundColor: "#f8fafc",
      },
    },
    lastRow: {
      borderBottom: "none",
    },
    label: {
      color: "#64748b",
      fontWeight: 600,
      fontSize: 14,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    val: {
      color: "#0f172a",
      fontSize: 16,
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      padding: "8px 16px",
      borderRadius: 50,
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      color: "#ffffff",
      fontSize: 13,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.025em",
      boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.25)",
    },
    toolbar: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
    },
    btn: {
      padding: "12px 24px",
      borderRadius: 12,
      border: "2px solid rgba(255,255,255,0.2)",
      background: "rgba(255,255,255,0.15)",
      color: "#ffffff",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 14,
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
      textTransform: "uppercase",
      letterSpacing: "0.025em",
    },
    btnHover: {
      background: "rgba(255,255,255,0.25)",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    },
    error: {
      color: "#dc2626",
      background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
      border: "1px solid #fca5a5",
      padding: "16px 20px",
      borderRadius: 16,
      marginBottom: 24,
      fontSize: 14,
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      gap: 12,
      boxShadow: "0 4px 14px 0 rgba(220, 38, 38, 0.1)",
    },
    skel: {
      height: 20,
      background:
        "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
      borderRadius: 8,
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
      width: "70%",
    },
    userIcon: {
      width: 24,
      height: 24,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: 12,
      fontWeight: 600,
    },
    iconPlaceholder: {
      width: 16,
      height: 16,
      borderRadius: 4,
      background: "#94a3b8",
    },
  };

  // Add shimmer animation style
  const shimmerStyle = `
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `;

  // Inject styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = shimmerStyle;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // API call logic remains the same
  useEffect(() => {
    const access = localStorage.getItem("access");
    if (!access) {
      navigate("/login", { replace: true });
      return;
    }

    const run = async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(`${API_BASE}/api/auth/me/`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${access}`,
          },
        });

        if (res.status === 401) {
          navigate("/login", { replace: true });
          return;
        }

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          const detail =
            data?.detail ||
            Object.entries(data || {})
              .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
              .join(" | ") ||
            `${res.status} ${res.statusText}`;
          throw new Error(detail);
        }

        const data = await res.json();
        setUser(data);
      } catch (e) {
        setErr(e.message || "Không tải được thông tin tài khoản");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const field = (label, value, isBadge = false, isLast = false) => (
    <div style={{ ...ui.row, ...(isLast ? ui.lastRow : {}) }} key={label}>
      <div style={ui.label}>
        <div style={ui.iconPlaceholder}></div>
        {label}
      </div>
      <div style={ui.val}>
        {loading ? (
          <div style={ui.skel} />
        ) : isBadge ? (
          <span style={ui.badge}>{value || "—"}</span>
        ) : (
          <span>{value || "—"}</span>
        )}
      </div>
    </div>
  );

  const getUserInitials = (user) => {
    if (!user) return "U";
    const first = user.first_name?.[0] || "";
    const last = user.last_name?.[0] || "";
    return first + last || user.username?.[0]?.toUpperCase() || "U";
  };

  return (
    <div style={ui.page}>
      <div style={ui.container}>
        <div style={ui.header}>
          <div style={ui.headerBg}></div>
          <div style={ui.headerContent}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 8,
                }}
              >
                <div style={ui.userIcon}>
                  {loading ? "..." : getUserInitials(user)}
                </div>
                <h1 style={ui.title}>Hồ sơ của tôi</h1>
              </div>
              <div style={ui.subtitle}>
                Quản lý thông tin cá nhân và cài đặt tài khoản
              </div>
            </div>
            <div style={ui.toolbar}>
              <button
                style={ui.btn}
                onClick={() => navigate("/")}
                onMouseEnter={(e) => Object.assign(e.target.style, ui.btnHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, ui.btn)}
              >
                🏠 Trang chủ
              </button>
              <button
                style={ui.btn}
                onClick={logout}
                onMouseEnter={(e) => Object.assign(e.target.style, ui.btnHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, ui.btn)}
              >
                🚪 Đăng xuất
              </button>
            </div>
          </div>
        </div>

        {err && <div style={ui.error}>⚠️ {err}</div>}

        <div style={ui.card}>
          <div style={ui.cardHeader}>
            <h2 style={ui.cardTitle}>📋 Thông tin cá nhân</h2>
          </div>
          <div style={ui.cardBody}>
            {field("Username", user?.username)}
            {field("Email", user?.email)}
            {field("Họ", user?.first_name)}
            {field("Tên", user?.last_name)}
            {field("Vai trò", user?.role, true)}
            {field(
              "Ngày tham gia",
              user?.date_joined
                ? new Date(user.date_joined).toLocaleString("vi-VN")
                : null,
              false,
              true
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
