import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";
import { useSelector } from "../../store";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "./Divider";

const Base = styled.li`
  text-align: left;
  border: 1px solid ${palette.gray[200]};
  position: relative;
  border-radius: 1rem;
  margin-bottom: 1rem;
  .item_inner {
    padding: 12px 40px 15px 36px;
    position: relative;
    display: block;
    width: 100%;
    .result_mark {
      position: absolute;
      top: 0.6rem;
      left: 1rem;
    }
    .pass {
      color: ${palette.blue[500]};
    }
    .fail {
      color: ${palette.red[500]};
    }
    .result_text {
      margin: 0 9px;
      .result_text_eng {
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 22px;
      }
      .result_text_kor {
        margin-left: 12px;
        font-size: 1rem;
        line-height: 22px;
        color: #888;
      }
    }
  }
`;

interface Props extends React.LiHTMLAttributes<HTMLLIElement> {
  answer: React.ReactNode;
  word: any;
  pass: boolean;
}

const ResultList: React.FC<Props> = ({ answer, word, pass, ...props }) => {
  const qzResult = useSelector((state) => state.result);
  return (
    <Base {...props}>
      <div className="item_inner">
        <div className={pass ? "result_mark pass" : "result_mark fail"}>
          {pass ? <DoneIcon /> : <ClearIcon />}
        </div>
        <div className="result_text">
          <span className="result_text_eng">{answer}</span>
          <span className="result_text_kor">{word[0]}</span>
        </div>
      </div>
    </Base>
  );
};

export default ResultList;
