import { Job } from "../types/job";

const API_BASE_URL = process.env.REACT_APP_API_URL || "";

export type PaginatedJobs = {
  posts: Job[];
  current_page: number;
  total_pages: number;
  total_count: number;
};

export const getAllJobs = async (page: number = 1): Promise<PaginatedJobs> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts?page=${page}`);

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

export const getSelectedJobs = async (
  category?: string,
  minSalary?: string,
  page: number = 1,
): Promise<PaginatedJobs> => {
  try {
    const params = new URLSearchParams();
    if (category) params.append("categories", category);
    if (minSalary) params.append("min_salary", minSalary);
    params.append("page", String(page));

    const response = await fetch(`${API_BASE_URL}/posts?${params.toString()}`, {
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
