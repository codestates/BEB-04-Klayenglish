import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "./store";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Test from "./components/Test";
import GlobalStyle from "./styles/GlobalStyle";
import Course from "./pages/Course";
import Comunity from "./pages/Comunity";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ChoseTest from "./pages/ChoseTest";
import TestGroup from "./pages/TestGroup";

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/choseTest" element={<ChoseTest />}></Route>
        <Route path="/testgroup/:id" element={<TestGroup />}></Route>
        <Route path="/test/:id" element={<Test />}></Route>
        <Route path="/comunity" element={<Comunity />}></Route>
        <Route path="/course/" element={<Course />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
};

export default App;
