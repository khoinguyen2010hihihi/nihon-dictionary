import React from "react";

function WordCard({ wordData }) {
  return (
    <div className="word-card">
      <h2>
        {wordData.word} ({wordData.reading})
      </h2>
      <p>{wordData.meaning}</p>
      <ul>
        {wordData.examples.map((ex, i) => (
          <li key={i}>
            {ex.jp} - {ex.vn}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WordCard;
