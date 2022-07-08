import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";

const WordsCard: React.FC = () => {
  // const advice = item;
  // console.log("slip", item);
  return (
    <div>
      <Card>
        <Card.Body>wordcard</Card.Body>
        {/* <Card.Body>{slip?.advice}</Card.Body> */}
      </Card>
    </div>
  );
};

export default WordsCard;
