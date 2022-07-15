import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import lectureList from "../lib/lectureList";
import styled from "styled-components";
import palette from "../styles/palette";

const Base = styled.li``;
const CardItem: React.FC = (props) => {
  const [cards, setCards] = useState<any>([]);
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

  // const aa = cards.filter((ll: any) => ll.lec_id);

  return (
    <>
      {/* {cards.lec_id}
      {cards.lec_name} */}
      {/* {cards.lec_name} */}
    </>
    // <>
    //   {cardId.map((aa) => (
    //     <Base className="cards__item" key={aa.id}>
    //       <Link className="cards__item__link" to={aa.path}>
    //         {aa.path}
    //         <figure className="cards__item__pic-wrap" data-category={aa.label}>
    //           <img
    //             className="cards__item__img"
    //             alt="Lecture Image"
    //             src={aa.src}
    //             //  {props.src}
    //           />
    //         </figure>
    //         <div className="cards__item__info">
    //           <h5 className="cards__item__text">{aa.text}</h5>
    //           {/* 10 tut($ 4.56) */}
    //         </div>
    //       </Link>
    //     </Base>
    //   ))}
    // </>
  );
};

export default CardItem;
