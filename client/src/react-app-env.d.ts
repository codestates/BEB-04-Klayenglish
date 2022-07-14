/// <reference types="react-scripts" />

interface Window {
  ethereum: any;
}

// 👉 Window라는 객체에 메타마스크를 설치하면 ethereum: any 라는 오브젝트가 생긴다
// 👉 리액트에선 이걸 인식하지 못함
// 👉 그래서 이런식으로 강제로 적어주는것이다
