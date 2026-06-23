import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alerts from "./component/Alerts/Alerts";
import ErrorBoundary from "./component/ErrorBoundary/ErrorBoundary";
import NotFoundPage from "./component/NoPageFound/NotFoundPage";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="flex items-center flex-col">
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Alerts />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/:userId" element={<Home />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}
