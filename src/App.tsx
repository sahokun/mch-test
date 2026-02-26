import React, { lazy, Suspense } from "react";
import { Link, Routes, Route } from "react-router-dom";

const HomeView = lazy(() => import("./views/HomeView"));
const LpVpView = lazy(() => import("./views/LpVpView"));
const BalanceChecker = lazy(() => import("./views/BalanceChecker"));

export default function App() {
  return (
    <>
      <header>
        <div>
          <nav style={{ borderBottom: "1px solid black" }}>
            <button><Link to="/">Home</Link></button>
            <button><Link to="/lpvp">LPVP</Link></button>
            <button><Link to="/balance-checker">BalanceChecker</Link></button>
          </nav>
        </div>
      </header>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/lpvp" element={<LpVpView />} />
          <Route path="/balance-checker" element={<BalanceChecker />} />
        </Routes>
      </Suspense>
    </>
  );
}
