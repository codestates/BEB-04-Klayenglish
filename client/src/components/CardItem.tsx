import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import lectureList from "../lib/lectureList";
import styled from "styled-components";
import {
  createTextChangeRange,
  validateLocaleAndSetLanguage,
} from "typescript";
import palette from "../styles/palette";
import TestLevel from "./common/TestLevel";

const Base = styled.li`
  box-sizing: border-box;
  position: relative;
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20rem;
  cursor: pointer;
  &:hover {
    .test-image {
      transform: scale(1.1);
    }
    .text-box-detail-container {
      bottom: 5rem;
    }
  }
  .test-image-container {
    overflow: hidden;
    margin: 0 auto;
    border-radius: 0.5rem;
  }
  .test-image {
    width: 22rem;
    height: 12rem;
    object-fit: cover;
    transition: all 0.5s;
    border-radius: 0.5rem;
  }
  .text-box-detail-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    position: absolute;
    bottom: 4.5rem;
    width: 20rem;
    border-radius: 0.5rem;
    background-color: #374151;
    text-align: center;
    transition: all 0.5s;
    .text-box-detail {
      margin-top: 0.3rem;
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
    .test-complete-total {
      margin-top: 0.5rem;
      margin-bottom: 0.3rem;
    }
  }
`;
const CardItem: React.FC = (props) => {
  const [cards, setCards] = useState([]);
  // const { id } = useParams();

  useEffect(() => {
    const cardData = async () => {
      try {
        fetch("http://localhost:3001/selectCard", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({}),
        }).then((res) =>
          res.json().then((result) => {
            setCards(result);
            console.log(result);
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    cardData();
  }, []);

  // const [clickedButton, setClickedButton] = useState("");

  let [closeList, setCloseList] = useState<boolean>(false);

  function buyLecture(id: any, name: any, price: any) {
    alert(id + " " + name + " " + price + " ");
    // console.log();
    // console.log(id);
    // console.log(document.getElementById(id)?.className + ".open");
    //document.getElementById(id)?.className + ".open";
    if (closeList) {
      setCloseList(false);
      console.log(document.getElementById(id));
    } else {
      setCloseList(true);
      console.log(document.getElementById(id));
    }
    // if (!closeList) {
    //   document.getElementById(id)?.className + ".open";
    // } else {
    // }
  }

  // map함수 실행
  const cardList: JSX.Element[] = cards.map((lec: any) => (
    // {`cards__item__link ${closeList ? "" : "open"}`}
    <Base
      id={lec.lec_id}
      key={lec.lec_id}
      onClick={() => buyLecture(lec.lec_id, lec.lec_name, lec.lec_price)}
    >
      <TestLevel level={lec.lec_level} position="ab" />
      <div className="test-image-container">
        <img className="test-image" src={lec.lec_image_path} />
      </div>
      <div className="text-box-detail-container">
        <span className="text-box-detail">{lec.lec_source}</span>
        <span className="test-complete-total">{lec.lec_price} tut</span>
      </div>
    </Base>
  ));
  return <>{cardList}</>;
};

export default CardItem;

// 이전에 사용했던 코드
/* 
<Base
className={`cards__item__link ${closeList ? "" : "open"}`}
id={lec.lec_id}
key={lec.lec_id}
onClick={() => buyLecture(lec.lec_id, lec.lec_name, lec.lec_price)}
>
<div className="cards__item__link">
  {lec.path}
  <figure className="cards__item__pic-wrap" data-category={lec.lec_level}>
    <img
      className="cards__item__img"
      alt="Lecture Image"
      src={lec.lec_image_path}
      //  {props.src}
    />
  </figure>
  <div className="cards__item__info">
    <h5 className="cards__item__text">{lec.lec_price} tut</h5>
    {/* 10 tut($ 4.56) 
  </div>
</div>
</Base> */
