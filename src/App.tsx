import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import GamePage from "./pages/GamePage.tsx";
import SignupPage from "./pages/SignupPage";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="z-20 fixed top-0 left-0">
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
