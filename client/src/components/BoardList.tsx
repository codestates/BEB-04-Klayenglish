// import axios from "axios";
// import React, { useEffect } from "react";
// import styled from "styled-components";

// const Base = styled.div`
//   cursor: pointer;
//   border-bottom: 1px solid #dddddd;
// `;

// const BoardList: React.FC = () => {
//   const [boardList, setBoardList] = useEffect < Array<Board>([]);
//   //   useState에 제네릭타입으로 Board타입의 Array라고 정의

//   useEffect(() => {
//     getBoardList();
//   }, []);
//   //   사이드렌더링
//   //   서버설정과 CORS설정 필요
//   //   클라이언트에서도 package.json에 proxy설정가능함 => 아직안함..
//   //   todo : 서버에서 넘어오는 게시판데이터 object, Boar.ts파일만들고 interface만들기
//   //     서버에서 받아노느 배열데이터를 useState 훅으로 정ㅇ의하기

//   const getBoardList = async () => {
//     const res = await axios.get(`http://localhost:8080/api/boards`);
//     console.log("res");
//   };
//   return (
//     <Base>
//       <div>
//         <h1>게시판목록보기</h1>
//         {
//           // boardList.map((board:Board))=>
//           // <Row>
//           //     <Col >board.title}</Col>
//           //     <Col xs="auto" sm="auto">{boardList.created}</Col>
//           // </Row>
//         }
//       </div>
//     </Base>
//   );
// };

// export default BoardList;
