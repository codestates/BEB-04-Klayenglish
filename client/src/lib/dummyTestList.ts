import { Url } from "url";
import TestLevel from "../components/common/TestLevel";

type Props = {
  testId: number;
  testImg: string;
  testTitle: string;
  testLevel: "master" | "diamond" | "bronze";
};

// 배열일 경우 마지막에 []을 붙인다
const dummyTestList: Props[] = [
  {
    testId: 0,
    testImg: "https://ichef.bbci.co.uk/images/ic/1200x675/p07jbsw9.jpg",
    testTitle: "신문·방송 필수 단어",
    testLevel: "bronze",
  },
  {
    testId: 1,
    testImg:
      "https://www.niemanlab.org/images/new-york-times-en-espanol-1.jpeg",
    testTitle: "신문·방송 유의어",
    testLevel: "diamond",
  },
  {
    testId: 2,
    testImg:
      "https://image.cnbcfm.com/api/v1/image/107070774-1654258080167-gettyimages-1397934926-km202847_5ccfc608-bebd-4544-91b1-3e77eab44ce0.jpeg?v=1654258161",
    testTitle: "신문·방송 동사구",
    testLevel: "master",
  },
];

export default dummyTestList;
