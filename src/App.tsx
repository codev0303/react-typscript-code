import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Alerts from "./component/Alerts/Alerts";
import UserCheckList from "./component/Checklist/Checklist";
import ErrorBoundary from "./component/ErrorBoundary/ErrorBoundary";
import NotFoundPage from "./component/NoPageFound/NotFoundPage";
import Home from "./pages/Home";


export default function App() {
  return (
    <div className="flex items-center flex-col">
      <BrowserRouter>
      <Alerts/>
      <ErrorBoundary>
      <Routes>
        <Route  path="/" element={<Home/>}>
          <Route path={`/users/:userId/*`} element={<UserCheckList/>}/>
        </Route>
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
      </ErrorBoundary  >
      </BrowserRouter>
    </div>
  );
}
