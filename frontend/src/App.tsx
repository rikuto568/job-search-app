import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobSearchPage from "./components/JobSearchPage";
import JobPostPage from "./components/JobPostPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 上が選択肢全体、下がこのUrlならこのページみたいな感じ */}
          <Route path="/" element={<JobSearchPage />} />
          <Route path="/search" element={<JobSearchPage />} />
          {<Route path="/post" element={<JobPostPage />} />}
        </Routes>
      </div>
    </BrowserRouter>
    // ブラウザールーターで囲んでる
  );
}

export default App;
