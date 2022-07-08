import React from "react";
import { Link } from "react-router-dom";
import lectureList from "../lib/lectureList";

const CardItem: React.FC = (props) => {
  return (
    <>
      {lectureList.map((aa) => (
        <li className="cards__item" key={aa.id}>
          <Link className="cards__item__link" to={aa.path}>
            <figure className="cards__item__pic-wrap" data-category={aa.label}>
              <img
                className="cards__item__img"
                alt="Lecture Image"
                src={aa.src}
                //  {props.src}
              />
            </figure>
            <div className="cards__item__info">
              <h5 className="cards__item__text">{aa.text}</h5>
              {/* 10 tut($ 4.56) */}
            </div>
          </Link>
        </li>
      ))}
    </>
  );
};

export default CardItem;
