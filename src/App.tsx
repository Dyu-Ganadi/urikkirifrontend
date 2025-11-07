import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header isAuth={true} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
