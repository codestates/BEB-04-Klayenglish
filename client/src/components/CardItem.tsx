import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import lectureList from "../lib/lectureList";
import { css } from "styled-components";
import styled from "styled-components";
import {
  createTextChangeRange,
  validateLocaleAndSetLanguage,
} from "typescript";
import palette from "../styles/palette";
import TestLevel from "./common/TestLevel";
import Button from "./common/Button";
import { modalActions } from "../store/modalSlice";
import { useSelector, useDispatch } from "../store";

const Base = styled.div`
  box-sizing: border-box;
  position: relative;
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20rem;

  &:hover {
    .test-image {
      transform: scale(1.1);
    }
    .text-box-detail-container {
      bottom: 5.5rem;
    }
  }
  &:visited {
    .test-image {
      transform: scale(1.1);
    }
    .text-box-detail-container {
      bottom: 5.5rem;
    }
  }
  .test-image-container {
    overflow: hidden;
    margin: 0 auto;
    border-radius: 0.5rem;
    transform-origin: 50% 50%;
    cursor: pointer;
    // 나가기 버튼 클릭시 원위치 회전
    transition: 1s;
    transform: rotateY(360deg);
  }

  .s {
    transition: 1s;
    opacity: 0.4;
  }
  // flip이후 이미지 컨테이너 css
  .flip-image-container {
    overflow: hidden;
    margin: 0 auto;
    border-radius: 0.5rem;
    transform-origin: 50% 50%;
    // 180도 회전
    transition: 1s;
    transform: rotateY(180deg);
    .test-image {
      width: 22rem;
      height: 12rem;
      object-fit: cover;
      transition: all 0.5s;
      border-radius: 0.5rem;
      opacity: 0.4;
    }
  }
  .test-image {
    width: 22rem;
    height: 12rem;
    object-fit: cover;
    transition: all 0.5s;
    border-radius: 0.5rem;
  }
  .text-box-detail-container {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    position: absolute;
    bottom: 5rem;
    width: 20rem;
    border-radius: 0.5rem;
    background-color: #374151;
    text-align: center;
    transition: all 0.5s;
    .text-box-detail {
      margin-top: 0.3rem;
      font-size: 1.25rem;
    }
    .test-complete-total {
      margin-top: 0.5rem;
      margin-bottom: 0.3rem;
    }
  }
  // flip이후 버튼 박스 css
  .fliped {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    position: absolute;
    width: 20rem;
    border-radius: 0.5rem;
    background-color: #374151;
    text-align: center;
    transition: all 0.5s;
    bottom: 11rem;
    .buy-course {
      margin: 1rem 2.5rem 1rem 0;
      padding: 1.5rem 1.5rem;
      background-color: ${palette.blue[700]};
      color: ${palette.gray[200]};
      border: solid ${palette.blue[700]};
      &:hover {
        border: solid ${palette.blue[600]};
        background-color: ${palette.blue[600]};
        color: ${palette.gray[200]};
      }
    }
    .bought-course {
      transition: 1s;
      transform: rotateY(360deg);
      margin: 1rem 2.5rem 1rem 0;
      padding: 1.5rem 1.5rem;
      border: solid ${palette.blue[600]};
      background-color: #374151;
      color: ${palette.blue[500]};
    }
    .out-purchase {
      margin: 1rem 0 1rem 2.5rem;
      padding: 1.5rem 1.5rem;
      background-color: ${palette.gray[200]};
      color: ${palette.gray[800]};
      border: solid ${palette.gray[200]};
      &:hover {
        border: solid ${palette.gray[200]};
        background-color: #374151;
        color: ${palette.gray[200]};
      }
    }
  }
`;

interface Props {
  key: any;
  props: any;
}

const CardItem: React.FC<Props> = ({ key, props }) => {
  const [flip, setFlip] = useState<boolean>(false);
  const [get, setGet] = useState<string>("notyet");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  let [closeList, setCloseList] = useState<boolean>(false);

  function buyLecture(id: any, name: any, price: any) {
    //alert(id + " " + name + " " + price + " ");
    if (closeList) {
      setCloseList(false);
      console.log(document.getElementById(id));
    } else {
      setCloseList(true);
      console.log(document.getElementById(id));
    }
    setFlip(true);
  }

  const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 여기에 구매 함수 작성
    if (!isLoggedIn) {
      navigate("/signin", { replace: true });
      dispatch(modalActions.openNeedLoginModalOpen());
    } else {
      alert("구매완료!");
      setGet("complete");
    }
  };

  return (
    <>
      {flip ? (
        <Base>
          <TestLevel level={props.lec_level} position="ab" className="s" />
          <div className="flip-image-container">
            <img className="test-image" src={props.lec_image_path} />
          </div>
          <div className="fliped">
            {get == "complete" ? (
              <Button className="bought-course">구매완료</Button>
            ) : (
              <Button className="buy-course" onClick={handleBuyClick}>
                구매하기
              </Button>
            )}
            <Button className="out-purchase" onClick={() => setFlip(false)}>
              나가기
            </Button>
          </div>
        </Base>
      ) : (
        <Base
          onClick={() =>
            buyLecture(props.lec_id, props.lec_name, props.lec_price)
          }
        >
          <TestLevel level={props.lec_level} position="ab" />
          <div className="test-image-container">
            <img className="test-image" src={props.lec_image_path} />
          </div>
          <div className="text-box-detail-container">
            <span className="text-box-detail">{props.lec_source}</span>
            <span className="test-complete-total">{props.lec_price} tut</span>
          </div>
        </Base>
      )}
    </>
  );
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
