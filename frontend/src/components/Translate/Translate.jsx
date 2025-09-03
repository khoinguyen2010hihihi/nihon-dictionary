import React, { useState } from "react";
import "./Translate.css";

function Translate() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [history, setHistory] = useState([]);
  const [fromLang, setFromLang] = useState("Japanese");
  const [toLang, setToLang] = useState("Vietnamese");

  const handleTranslate = () => {
    if (!inputText.trim()) return;

    // Fake dịch (chỉ đảo ngược chuỗi cho vui)
    const translated = inputText.split("").reverse().join("");

    setOutputText(translated);

    // Lưu vào lịch sử
    setHistory([
      {
        input: inputText,
        output: translated,
        time: new Date(),
        fromLang,
        toLang,
      },
      ...history,
    ]);
  };

  const handleSwapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  return (
    <div className="translate-container">
      {/* Thanh chọn ngôn ngữ */}
      <div className="language-bar">
        <select value={fromLang} onChange={(e) => setFromLang(e.target.value)}>
          <option>Japanese</option>
          <option>Vietnamese</option>
          <option>English</option>
        </select>
        <button className="swap-btn" onClick={handleSwapLanguages}>
          ⇄
        </button>
        <select value={toLang} onChange={(e) => setToLang(e.target.value)}>
          <option>Vietnamese</option>
          <option>Japanese</option>
          <option>English</option>
        </select>
      </div>

      {/* 2 ô nhập/xuất */}
      <div className="translate-box">
        <textarea
          placeholder="Nhập văn bản cần dịch..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          maxLength={5000}
        />
        <textarea
          placeholder="Kết quả dịch sẽ xuất hiện ở đây..."
          value={outputText}
          readOnly
        />
      </div>

      {/* Thanh dưới với nút dịch */}
      <div className="bottom-bar">
        <div className="bottom-left">
          <span className="char-count">{inputText.length}/5000</span>
        </div>
        <button
          className="translate-btn"
          onClick={handleTranslate}
          disabled={!inputText.trim()}
        >
          Dịch
        </button>
      </div>

      {/* Lịch sử */}
      <div className="history">
        <div className="history-header">
          <div className="history-icon">📖</div>
          <h3>Lịch sử</h3>
        </div>

        <div className="history-content">
          {history.length === 0 ? (
            <div className="add-translation">Thêm bản dịch</div>
          ) : (
            <>
              {history.map((item, index) => (
                <div key={index} className="history-item">
                  <p>
                    <b>{item.input}</b> → {item.output}
                  </p>
                  <span>🕒 {item.time.toLocaleDateString("vi-VN")}</span>
                </div>
              ))}
              <div className="add-translation">Thêm bản dịch</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Translate;
