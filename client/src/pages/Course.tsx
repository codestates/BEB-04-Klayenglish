import React from "react";
import CardItem from "../components/CardItem";
import "./Cards.css";
import lectureList from "../lib/lectureList";

const Course: React.FC = () => {
  return (
    <div className="cards">
      <h1>Buy more advanced courses with TUT coins!!!!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem />
            {/* <CardItem />
            <CardItem />
            <CardItem />
            <CardItem /> */}
          </ul>
          {/* <ul className="cards__items"> */}
          {/* <CardItem src={"../dummy/voca.png"} /> */}
          {/* <CardItem
              src="images/img-3.jpg"
              text="Set Sail in the Atlantic Ocean visiting Uncharted Waters"
              label="Mystery"
              path="/services"
            />
            <CardItem
              src="images/img-4.jpg"
              text="Experience Football on Top of the Himilayan Mountains"
              label="Adventure"
              path="/products"
            />
            <CardItem
              src="images/img-8.jpg"
              text="Ride through the Sahara Desert on a guided camel tour"
              label="Adrenaline"
              path="/sign-up"
            // /> */}
          {/* </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Course;
