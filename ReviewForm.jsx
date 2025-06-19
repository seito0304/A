import { useState } from "react";
import axios from "axios";

function ReviewForm() {
  const [reviewText, setReviewText] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/reviews", {
        userName,
        reviewText,
      });
      setMessage("レビューを送信しました！");
      setReviewText("");
      setUserName("");
    } catch (error) {
      setMessage("送信に失敗しました。");
    }
  };

  return (
    <div className="review-form">
      <h2>レビュー投稿</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ユーザー名"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <textarea
          placeholder="レビュー内容"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
        <button type="submit">投稿</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ReviewForm;
