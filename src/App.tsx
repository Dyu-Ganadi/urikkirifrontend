import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Header } from "./components/index.ts";
import {
  LandingPage,
  LoginPage,
  GamePage,
  SignupPage,
  MyPage,
  RankingPage,
  EnterRoom,
  WaitingRoom,
} from "./pages/index.ts";

const Layout = () => {
  const token = localStorage.getItem("access_token");
  const isAuth = token !== null && token !== "undefined" && token !== "";
  return (
    <>
      <div className="relative flex flex-col min-h-screen">
        <div className="z-20 absolute top-0 left-0">
          <Header isAuth={isAuth} />
        </div>

        <Outlet />
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/enter-room" element={<EnterRoom />} />
          <Route path="/wait-room" element={<WaitingRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
