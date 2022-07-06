import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "./store";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Test from "./pages/Test";
import TestDetail from "./pages/TestDetail";

const App: React.FC = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/test/:id" element={<TestDetail />}></Route>
        {/* 라우터 안에는 2개에 props를 가져간다! */}
        {/* Restful api 규칙에따른  MovieDetail설정하였음*/}
      </Routes>
    </div>
  );
};

export default App;
