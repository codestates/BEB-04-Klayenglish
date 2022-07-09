import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { "Content-type": "application/json" },
  //   타입지정
});
//create를 활용 ~ baseURL을 활용하여 코드 간소화 !

// interceptors을 추가하여 api 디버깅하기 쉬움 => 없어도됌!! 그냥확인용도
api.interceptors.request.use(
  function (config) {
    console.log("request start", config);
    // 콘솔로 찍어서 확인가능 ~ => 가로채서 확인용 ~~
    return config;
  },
  function (error) {
    console.log("request error", error);
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    console.log("get response", response);
    // 똑같이 진행

    return response;
  },
  function (error) {
    console.log("get error", error);
    return Promise.reject(error);
  }
);
export default api;
