import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "./store";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import GlobalStyle from "./styles/GlobalStyle";
import Course from "./pages/Course";
import Comunity from "./pages/Comunity";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Wallet from "./pages/Wallet";
import Test from "./pages/Test";
import ChoseTest from "./pages/ChoseTest";
import TestGroup from "./pages/TestGroup";
import TestResult from "./pages/TestResult";
import { useState, useEffect } from "react";
import { userActions } from "./store/userSlice";
import { WindowRounded } from "@mui/icons-material";

const App: React.FC = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  // window.ethereum.request();
  const setUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [tutbalance, setTutbalance] = useState("");

  window.ethereum.request();
  const userInfo = useSelector((state) => state.user.nickname);
  const dispatch = useDispatch();
  // 토큰을 통한 인증확인
  const auth = async () => {
    const token: any = localStorage.getItem("accessToken");
    const parseToken: any = JSON.parse(token);
    if (token) {
      dispatch(userActions.setLoggedIn());
      try {
        fetch("http://localhost:3001/user/auth", {
          method: "post",
          headers: {
            authorization: `Bearer ${parseToken.accessToken}`,
          },
        }).then((res) => {
          // email과 nickname 저장
          res.json().then((msg) => {
            if (msg.ok) {
              dispatch(userActions.setUserInfo(msg["data"]));
              console.log("인증 성공");
            } else {
              alert(msg.message);
            }
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!setUserLoggedIn) {
      if (localStorage.length != 0) {
        console.log("유저 인증 중...");
        auth();
      }
    }
  });
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
        window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: "0x9d8D3C04240cabcF21639656F8b1F2Af0765Cf08",
              symbol: "TUT",
              decimals: 18,
              image:
                "data:image/png;base64,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",
            },
          },
        });
      } else {
        alert("Install Metamask first!!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const Connect2 = async () => {
  //   const minABI = [
  //     // balanceOf
  //     {
  //       constant: true,
  //       inputs: [{ name: "_owner", type: "address" }],
  //       name: "balanceOf",
  //       outputs: [{ name: "balance", type: "uint256" }],
  //       type: "function",
  //     },
  //   ];
  //   const connection = `https://rinkeby.infura.io/v3/039a1d24b7384022a3b6994dd5627c61`;
  //   const web3 = new Web3(new Web3.providers.HttpProvider(connection));
  //   const tokenAddress = "0x9d8D3C04240cabcF21639656F8b1F2Af0765Cf08";
  //   const walletAddress = "0x4bFe6D25A7DACbCF9018a86eDd79A7168eBf6b7f";

  //   const contract = new web3.eth.Contract(minABI as AbiItem[], tokenAddress);
  //   const result = await contract.methods.balanceOf(walletAddress).call(); // 29803630997051883414242659

  //   const format = web3.utils.fromWei(result); // 29803630.997051883414242659

  //   console.log(format);
  //   setTutbalance(format);
  // };

  return (
    <div>
      <GlobalStyle />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/choseTest" element={<ChoseTest />}></Route>
        <Route path="/testResult/:id" element={<TestResult />}></Route>
        <Route path="/testgroup/:id" element={<TestGroup />}></Route>
        <Route path="/comunity" element={<Comunity />}></Route>
        <Route path="/course/" element={<Course />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/test/:id" element={<Test />}></Route>
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
