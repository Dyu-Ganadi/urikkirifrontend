import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import GamePage from "./pages/GamePage.tsx";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import RankingPage from "./pages/RankingPage.tsx";
import EnterRoom from "./pages/EnterRoom.tsx";
import WaitingRoom from "./pages/WaitingRoom.tsx";

const Layout = () => {
  return (
    <>
      <div className="relative flex flex-col min-h-screen">
        <div className="z-20 absolute top-0 left-0">
          <Header isAuth={true} />
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
