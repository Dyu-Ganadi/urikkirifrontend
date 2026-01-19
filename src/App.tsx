import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
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
import { WebSocketProvider } from "./context/WebSocketContext.tsx";

const Layout = () => {
  const token = localStorage.getItem("access_token");
  const isAuth = token !== null && token !== "undefined" && token !== "";
  const location = useLocation();

  // 대기 화면에서는 헤더 숨기기
  const hideHeader =
    location.pathname === "/wait-room" || location.pathname === "/game";

  return (
    <>
      <div className="relative flex flex-col min-h-screen">
        {!hideHeader && (
          <div className="z-20 absolute top-0 left-0">
            <Header isAuth={isAuth} />
          </div>
        )}

        <Outlet />
      </div>
    </>
  );
};

function App() {
  return (
    <WebSocketProvider>
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
    </WebSocketProvider>
  );
}

export default App;
