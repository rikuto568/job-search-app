import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL || "";

const categories = [
  "事務",
  "営業",
  "エンジニア",
  "デザイン",
  "マーケティング",
  "財務・経理",
  "人事",
  "カスタマーサポート",
  "製造",
  "医療・介護",
];
const JobPostPage: React.FC = () => {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const postData = {
      job_title: jobTitle,
      salary: salary,
      category: category,
    };

    console.log("送信するデータ:", postData);

    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post: postData }),
      });
      if (!response.ok) {
        throw new Error("求人の投稿に失敗しました");
      }

      const result = await response.json();
      console.log("サーバーからのレスポンス:", result);
      navigate("/search");
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  return (
    <div>
      {/* ここからヘッダー */}
      <header className="bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">求人検索アプリ</h1>
          <nav className="items-center space-x-4">
            <Link to="/search" className="text-sm hover:underline">
              求人検索
            </Link>
            <Link to="/post" className="text-sm hover:underline">
              求人投稿
            </Link>
          </nav>
        </div>
      </header>
      {/* ここまで */}
      {/* ここからメイン */}
      <main className="max-w-2xl mx-8 my-4 rounded-lg shadow-sm mt- ">
        <h2 className="text-2xl font-semibold mb-6">求人投稿</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              求人カテゴリ選択
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-2/5 border border-gray-300 rounded-md  mb-3 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus-ring-sky-300 hover:bg-gray-50"
            >
              <option value="">カテゴリを選択 ▼</option>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              年収（万円）
            </label>
            <input
              type="text"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
              className="w-2/5 border border-gray-300 rounded-md  mb-3 px-3 py-2 text-sm focus:outline-none focus:ring-sky-300 hover:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              求人タイトル
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md  mb-3 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 hover:bg-gray-50"
            />
          </div>
          <div className="pt-6">
            <button
              type="submit"
              className="w-2/5 bg-sky-600 text-white px-6 py-2 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:opacity-50 transition"
            >
              投稿
            </button>
          </div>
        </form>
      </main>
      {/* ここまで */}
    </div>
  );
};

export default JobPostPage;
