import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import lectureList from "../lib/lectureList";
import styled from "styled-components";
import {
  createTextChangeRange,
  validateLocaleAndSetLanguage,
} from "typescript";
import palette from "../styles/palette";

const Base = styled.li``;
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
          {/* 10 tut($ 4.56) */}
        </div>
      </div>
    </Base>
  ));
  return <>{cardList}</>;
};

export default CardItem;
