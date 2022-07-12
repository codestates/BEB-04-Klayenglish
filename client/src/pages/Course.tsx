import React from "react";
import CardItem from "../components/CardItem";
import lectureList from "../lib/lectureList";
import styled from "styled-components";
import palette from "../styles/palette";

// card.css 파일 옮겨왔습니다. - 규현
const Cards = styled.div`
  padding: 4rem;
  background: ${palette.black};
  .cards__intro {
    text-align: center;
    color: ${palette.gray[200]};
  }
  .cards__container {
    display: flex;
    flex-flow: column;
    max-width: 65rem;
    width: 90%;
    margin: 0 auto;
  }

  .cards__wrapper {
    position: relative;
    margin: 50px 0 45px;
  }

  .cards__items {
    margin-bottom: 24px;
  }

  .cards__item {
    display: flex;
    flex: 1;
    margin: 0 1rem;
    border-radius: 10px;
    background-color: ${palette.black};
  }

  .cards__item__link {
    display: flex;
    flex-flow: column;
    width: 100%;
    box-shadow: 0 0px 30px rgba(0, 0, 0, 1);
    -webkit-filter: drop-shadow(0 6px 20px rgba(56, 125, 255, 0.017));
    filter: drop-shadow(0 6px 20px rgba(56, 125, 255, 0.017));
    border-radius: 10px;
    overflow: hidden;
    text-decoration: none;
  }

  .cards__item__pic-wrap {
    position: relative;
    width: 100%;
    padding-top: 67%;
    overflow: hidden;
  }

  .fade-img {
    animation-name: fade-img;
    animation-duration: 2s;
  }

  .cards__item__pic-wrap::after {
    content: attr(data-category);
    position: absolute;
    bottom: 0;
    margin-left: 10px;
    padding: 6px 8px;
    max-width: calc((100%) - 60px);
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    background-color: #1f98f4;
    box-sizing: border-box;
  }

  .cards__item__img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    object-fit: cover;
    transition: all 0.2s linear;
  }

  .cards__item__img:hover {
    transform: scale(1.1);
  }

  .cards__item__info {
    padding: 20px 30px 30px;
  }

  .cards__item__text {
    color: ${palette.gray[200]};
    font-size: 18px;
    line-height: 24px;
  }

  @media only screen and (min-width: 1200px) {
    .content__blog__container {
      width: 84%;
    }
  }

  @media only screen and (min-width: 1024px) {
    .cards__items {
      display: flex;
    }
  }

  @media only screen and (max-width: 1024px) {
    .cards__item {
      margin-bottom: 2rem;
    }
  }
`;

const Course: React.FC = () => {
  return (
    <Cards>
      <h1 className="cards__intro">
        Buy more advanced courses with TUT coins!!!!
      </h1>
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
    </Cards>
  );
};

export default Course;
