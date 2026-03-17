import React, { useState, useEffect } from "react";
import { Job } from "../types/job";
import {
  getAllJobs,
  getSelectedJobs,
  type PaginatedJobs,
} from "../services/api";
import { Link } from "react-router-dom";
// 今の段階ではリアルタイム性はなく、リロードが必要
const JobSearchPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSalary, setSelectedSalary] = useState<string>("300");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  // 　＝の後の一個目が型定義（管理するデータの型の指定）、二個目が初期値（リアクトの書き方）

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let data: PaginatedJobs;
        if (selectedCategory || selectedSalary) {
          data = await getSelectedJobs(
            selectedCategory,
            selectedSalary,
            currentPage,
          );
          console.log("getSelectedJobs result:", data);
        } else {
          data = await getAllJobs(currentPage);
          console.log("getAllJobs result:", data);
        }

        setJobs(data?.posts || []);
        setTotalPages(data?.total_pages ?? 1);
        setCurrentPage(data?.current_page ?? 1);
        setTotalCount(data?.total_count ?? 0);
      } catch (error) {
        console.error("求人データの取得に失敗:", error);
      }
    };
    fetchJobs();
  }, [selectedCategory, selectedSalary, currentPage]);

  // ページネーションの処理
  // フィルタを変えたらページを1に戻す
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };
  const handleSalaryChange = (value: string) => {
    setSelectedSalary(value);
    setCurrentPage(1);
  };
  // ページ移動（ボタンで呼ぶ）
  const goToPage = (page: number) => {
    if (page < 1) return;
    // totalPages が存在すれば上限を越えないように
    if (totalPages && page > totalPages) return;
    setCurrentPage(page);
  };

  // 表示するページ番号を「5個分」だけ作る（currentPage中心）
  const getVisiblePages = (): number[] => {
    const pages: number[] = [];
    let start = currentPage - 2;
    if (start < 1) start = 1;
    for (let i = 0; i < 5; i++) {
      const p = start + i;
      if (totalPages && p > totalPages) break;
      pages.push(p);
    }
    return pages;
  };
  // 後ろの[]は中身が書かれているときはそれが変わるたびに処理が走る

  // データの流れ書いときます。
  // ラジオボタンを押すと、オンチェンジメソッドから、ユーズステートのセットのほうに情報が渡る＝＞
  // ユーズエフェクト発動＝＞フェッチジョブズが呼び出されて、いふぶんに書かれた処理が実行。＝＞
  // api.tsのgetSelectedJobが発動。＝＞
  // レイルズで定義したURLを作成して、中身（絞られたもの）をjsonで返す。それをjobsっていう定数が引き取る。＝＞
  // リターンに指定されてるからその値が返ってきて、それをdataっていう定数で定義して、セットして反映させてる！！
  return (
    <div>
      {/* ヘッダー */}
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
      {/* ここまで、ヘッダー */}

      {/* サイドバー */}
      <main className="max-w-6xl flex ">
        <aside className="w-40  bg-gray-100 p-4">
          <fieldset>
            <legend className="font-semibold mb-2">求人カテゴリ</legend>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="radio"
                name="category"
                className="appearance-none h-3 w-3 border border-sky-300 bg-gray-100 shadow-sm rounded-none focus:outline-none focus:ring-2 focus:ring-slate-300 checked:bg-slate-700 checked:border-slate-700"
                value="事務"
                checked={selectedCategory === "事務"}
                onChange={(e) => handleCategoryChange(e.target.value)}
                // せれくてっどカテゴリーにバリューの中身が渡される＝＞レンダリング
              />
              事務
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="radio"
                name="category"
                className="appearance-none h-3 w-3 border border-sky-300 bg-gray-100 shadow-sm rounded-none focus:outline-none focus:ring-2 focus:ring-slate-300 checked:bg-slate-700 checked:border-slate-700"
                value="エンジニア"
                checked={selectedCategory === "エンジニア"}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              エンジニア
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="radio"
                name="category"
                className="appearance-none h-3 w-3 border border-sky-300 bg-gray-100 shadow-sm rounded-none focus:outline-none focus:ring-2 focus:ring-slate-300 checked:bg-slate-700 checked:border-slate-700"
                value="営業"
                checked={selectedCategory === "営業"}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              営業
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="radio"
                name="category"
                className="appearance-none h-3 w-3 border border-sky-300  bg-gray-100 shadow-sm rounded-none checked:bg-slate-700 checked:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
                value="デザイン"
                checked={selectedCategory === "デザイン"}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              デザイン
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="radio"
                name="category"
                className="appearance-none h-3 w-3 border border-sky-300  bg-gray-100 shadow-sm rounded-none checked:bg-slate-700 checked:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
                value="マーケティング"
                checked={selectedCategory === "マーケティング"}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              マーケティング
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="radio"
                name="category"
                className="appearance-none h-3 w-3 border border-sky-300  bg-gray-100 shadow-sm rounded-none checked:bg-slate-700 checked:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
                value="財務・経理"
                checked={selectedCategory === "財務・経理"}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              財務・経理
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="radio"
                name="category"
                className="appearance-none h-3 w-3 border border-sky-300  bg-gray-100 shadow-sm rounded-none checked:bg-slate-700 checked:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
                value="人事"
                checked={selectedCategory === "人事"}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              人事
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="radio"
                name="category"
                className="appearance-none h-3 w-3 border border-sky-300  bg-gray-100 shadow-sm rounded-none checked:bg-slate-700 checked:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
                value="カスタマーサポート"
                checked={selectedCategory === "カスタマーサポート"}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              カスタマーサポート
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="radio"
                name="category"
                className="appearance-none h-3 w-3 border border-sky-300  bg-gray-100 shadow-sm rounded-none checked:bg-slate-700 checked:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
                value="製造"
                checked={selectedCategory === "製造"}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              製造
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="radio"
                name="category"
                className="appearance-none h-3 w-3 border border-sky-300  bg-gray-100 shadow-sm rounded-none checked:bg-slate-700 checked:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
                value="医療・介護"
                checked={selectedCategory === "医療・介護"}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              医療・介護
            </label>
          </fieldset>
          <div>
            <h3 className="font-semibold mb-2">年収</h3>
            <select
              className="w-full border border-gray-200 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2-slate-300"
              value={selectedSalary}
              onChange={(e) => handleSalaryChange(e.target.value)}
            >
              <option value="300">300万円以上 ▼</option>
              <option value="400">400万円以上</option>
              <option value="500">500万円以上</option>
              <option value="600">600万円以上</option>
              <option value="700">700万円以上</option>
            </select>
          </div>
        </aside>
        {/* ここまで、サイドバー */}

        <section className="flex-1 p-6 pb-20 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
          <h2 className="text-xl font-bold">求人一覧</h2>
          <p className="text-xs">該当件数: {totalCount}件</p>
          {/* ここから求人カード */}
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border border-gray-200 rounded-md bg-white p-4 hover:shadow-md transition-shadow duration-150 cursor-pointer focus-within:ring-2 focus-within:ring-slate-200"
            >
              <h3 className="font-semibold text-sm text-gray-900 mb-1">
                {job.job_title}
              </h3>
              <p className="text-xs text-gray-600">カテゴリ: {job.category}</p>
              <p className="text-xs text-gray-600">年収: {job.salary}万円</p>
              {/* ここまで */}
            </div>
          ))}
          {/* ページネーションUI ここから*/}
          <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-0 mt-4 rounded bg-white/95 px-2 py-1 shadow">
            <button
              className="px-0.5 py-0.5 rounded disabled:opacity-50 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              ◀
            </button>
            {getVisiblePages().map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`mx-0 px-0.5 py-0.5 rounded ${p === currentPage ? "font-bold" : "font-normal"}`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={totalPages ? currentPage >= totalPages : false}
              onClick={() => goToPage(currentPage + 1)}
              className="px-0.5 py-0.5 rounded disabled:opacity-50 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors"
            >
              ▶
            </button>
          </footer>
          {/* ここまで */}
        </section>
      </main>
    </div>
  );
};

export default JobSearchPage;
