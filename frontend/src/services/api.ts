import { Job } from "../types/job";

// バックエンドAPIのベースURL
const API_BASE_URL = "process.env.REACT_APP_API_URL";

export type PaginatedJobs = {
  posts: Job[];
  current_page: number;
  total_pages: number;
  total_count: number;
};

// 全ての求人を取得する関数
export const getAllJobs = async (page: number = 1): Promise<PaginatedJobs> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?page=${page}`);

    if (!response.ok) {
      throw new Error("求人データの取得に失敗しました");
    }
    // ここでデータを受け取る
    const data: PaginatedJobs = await response.json();
    console.log("fetch result:", data);
    return data;
    // 配列に格納されたjsonが返ってくる
  } catch (error) {
    console.error("API通信エラー:", error);
    throw error;
  }
};
export const getSelectedJobs = async (
  category?: string,
  minSalary?: string,
  page: number = 1,
): Promise<PaginatedJobs> => {
  try {
    // URLパラメータを構築
    const params = new URLSearchParams();
    if (category) params.append("categories", category);
    // categoryies = 選ばれたやつ（左と右をくっつけるメソッド）
    if (minSalary) params.append("min_salary", minSalary);
    // 上と同じ考え方
    params.append("page", String(page));

    const url = `${API_BASE_URL}/posts?${params.toString()}`;
    console.log("fetch url:", url);
    const response = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json", "Cache-Control": "no-cache" },
    });

    if (!response.ok) {
      throw new Error("求人データの取得に失敗しました");
    }

    const data: PaginatedJobs = await response.json();
    return data;
  } catch (error) {
    console.error("API通信エラー:", error);
    throw error;
  }
};
// このファイルの後半部分は条件で選ばれたデータの表のURLを作成する関数でアペンドを使って、＝でくっつけることでURLを作成し
// そのデータをフェッチしてとってきて、json形式で返すファイル
