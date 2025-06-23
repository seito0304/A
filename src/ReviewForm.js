import './ReviewForm.css';
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
    const [review, setReview] = useState("");
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        const firstProduct = productOptions[newCategory][0];
        setProduct(firstProduct);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (review.length > 140) {
            setMessage("レビューは140文字以内で入力してください。");
            return;
        }

        try {
            await axios.post("http://localhost:8080/api/reviews", {
                gender,
                age,
                category,
                product,
                review,
                date
            });
            setMessage("レビューを送信しました！");
            setReview("");
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
                <div className="field-group">
                    <div className="field-label">性別：</div>
                    <div className="toggle-group">
                        {["女性", "男性"].map((g) => (
                            <button
                                type="button"
                                key={g}
                                className={`toggle-button ${gender === g ? "selected" : ""}`}
                                onClick={() => setGender(g)}
                            >
                                {g}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 年齢 */}
                <div className="field-group">
                    <div className="field-label">年齢：</div>
                    <select value={age} onChange={(e) => setAge(Number(e.target.value))}>
                        {[...Array(63)].map((_, i) => {
                            const ageVal = i + 18;
                            return (
                                <option key={ageVal} value={ageVal}>
                                    {ageVal}歳
                                </option>
                            );
                        })}
                    </select>
                </div>


                {/* カテゴリ */}
                <div className="field-group">
                    <div className="field-label">カテゴリ：</div>
                    <div className="toggle-group">
                        {Object.keys(productOptions).map((cat) => (
                            <button
                                type="button"
                                key={cat}
                                className={`toggle-button ${category === cat ? "selected" : ""}`}
                                onClick={() => handleCategoryChange(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 製品 */}
                <div className="field-group">
                    <div className="field-label">製品：</div>
                    <div className="toggle-group">
                        {productOptions[category].map((prod) => (
                            <button
                                type="button"
                                key={prod}
                                className={`toggle-button ${product === prod ? "selected" : ""}`}
                                onClick={() => setProduct(prod)}
                            >
                                {prod}
                            </button>
                        ))}
                    </div>
                </div>

                {/* レビュー */}
                <div className="field-group">
                    <div className="field-label">レビュー（140字以内）：</div>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        maxLength={140}
                        required
                    />
                </div>

                {/* 日付 */}
                <div className="field-group">
                    <div className="field-label">日付：</div>
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
