import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "./store";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Test from "./pages/Test";
import TestDetail from "./pages/TestDetail";
import GlobalStyle from "./styles/GlobalStyle";

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/test/:id" element={<TestDetail />}></Route>
      </Routes>
    </div>
  );
};

export default App;
