// user table ddl
CREATE TABLE `users` (
`id` int PRIMARY KEY AUTO_INCREMENT,
`userName` varchar(255),
`password` varchar(255),
`created_at` timestamp default now(),
`nickName` varchar(255),
`address` varchar(255),
`privateKey` varchar(255)
);

//추후 구현할 테이블 수도코드
lecture (
lectureid(강좌 pkid)
강좌이름
강좌 가격
강좌 카테고리
강좌 난이도 레벨
이미지 경로
)

quiz (
퀴즈 pk값
lecture
단어 해석
정답
보기
)

통과유무 테이블 (
강좌 이름
유저 이름
통과 유무
)

users (
가지고있는 강좌 코드
)
