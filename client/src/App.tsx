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
import Wallet from "./pages/Wallet";
import ChoseTest from "./pages/ChoseTest";
import TestGroup from "./pages/TestGroup";
import { useState } from "react";

const App: React.FC = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  window.ethereum.request();
  const Connect = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);

        const balances = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        });
        setBalance(balances);
        // console.log("bal = " + balance / 10 ** 18);
        // 0x19eae62c6ab1906aa08253107178a8a502a97c43
      } else {
        alert("Install Metamask first!!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const getBal = async () => {
  //   try {
  //     if (window.ethereum) {
  //       console.log(account);
  //       const balance = await window.ethereum.request({
  //         method: "eth_getBalance",
  //         params: ["0x19eae62c6ab1906aa08253107178a8a502a97c43", "latest"],
  //       });
  //       console.log("bal = " + balance / 10 ** 18);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // getBal();

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
        <Route
          path="/wallet"
          element={
            <Wallet
              account={account}
              balance={balance}
              onClickConnect={Connect}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
