import './index.css';
import { useState } from "react";
import axios from "axios";

const productOptions = {
  家電: ["テレビ", "冷蔵庫", "エアコン", "電子レンジ", "掃除機"],
  日用品: ["シャンプー", "洗剤", "ティッシュ", "歯ブラシ"],
  食品: ["チョコレート", "インスタントラーメン", "ジュース", "コーヒー"],
  ファッション: ["シャツ", "靴", "バッグ", "腕時計"],
  家具: ["椅子", "ソファ", "机", "ベッド"]
};

function ReviewForm() {
  const [gender, setGender] = useState("女性");
  const [age, setAge] = useState(18);
  const [category, setCategory] = useState("家電");
  const [product, setProduct] = useState(productOptions["家電"][0]);
  const [reviewText, setReviewText] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    const firstProduct = productOptions[newCategory][0];
    setProduct(firstProduct);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reviewText.length > 140) {
      setMessage("レビューは140文字以内で入力してください。");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/reviews", {
        gender,
        age,
        category,
        product,
        reviewText,
        date
      });
      setMessage("レビューを送信しました！");
      setReviewText("");
      setDate("");
    } catch (error) {
      setMessage("送信に失敗しました。");
    }
  };

  return (
    <div className="review-form">
      <h2>レビュー投稿</h2>
      <form onSubmit={handleSubmit}>
        {/* 性別 */}
        <div>
          <label>性別：</label>
          {["女性", "男性"].map((g) => (
            <label key={g}>
              <input
                type="radio"
                name="gender"
                value={g}
                checked={gender === g}
                onChange={() => setGender(g)}
              />
              {g}
            </label>
          ))}
        </div>

        {/* 年齢 */}
        <div>
          <label>年齢：</label>
          {[...Array(63)].map((_, i) => {
            const ageVal = i + 18;
            return (
              <label key={ageVal}>
                <input
                  type="radio"
                  name="age"
                  value={ageVal}
                  checked={age === ageVal}
                  onChange={() => setAge(ageVal)}
                />
                {ageVal}歳
              </label>
            );
          })}
        </div>

        {/* カテゴリ */}
        <div>
          <label>カテゴリ：</label>
          {Object.keys(productOptions).map((cat) => (
            <label key={cat}>
              <input
                type="radio"
                name="category"
                value={cat}
                checked={category === cat}
                onChange={() => handleCategoryChange(cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        {/* 製品 */}
        <div>
          <label>製品：</label>
          {productOptions[category].map((prod) => (
            <label key={prod}>
              <input
                type="radio"
                name="product"
                value={prod}
                checked={product === prod}
                onChange={() => setProduct(prod)}
              />
              {prod}
            </label>
          ))}
        </div>

        {/* レビュー */}
        <div>
          <label>レビュー（140字以内）：</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            maxLength={140}
            required
          />
        </div>

        {/* 日付 */}
        <div>
          <label>日付：</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">投稿</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ReviewForm;
