import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "./store";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Test from "./components/Test";
import TestDetail from "./pages/TestDetail";
import GlobalStyle from "./styles/GlobalStyle";
import Course from "./pages/Course";
import Comunity from "./pages/Comunity";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Wallet from "./pages/Wallet";
import ChoseTest from "./pages/ChoseTest";
import { useState } from "react";

const App: React.FC = () => {
  const [account, setAccount] = useState("");

  const Connect = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
      } else {
        alert("Install Metamask first!!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <GlobalStyle />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/choseTest" element={<ChoseTest />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/comunity" element={<Comunity />}></Route>
        <Route path="/test/:id" element={<TestDetail />}></Route>
        <Route path="/course/" element={<Course />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          path="/wallet"
          element={<Wallet account={account} onClickConnect={Connect} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
