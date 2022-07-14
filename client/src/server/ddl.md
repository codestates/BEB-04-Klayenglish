CREATE TABLE `users` ( --유저 테이블
`id` int PRIMARY KEY AUTO_INCREMENT, --user pk값
`userName` varchar(255), --email형식의 아이디
`password` varchar(255),
`created_at` timestamp default now(),
`nickName` varchar(255),
`address` varchar(255), --지갑 주소
`privateKey` varchar(255), --니모닉 key
`taken_lectures` varchar(255) --가지고있는 강좌들 lecture table에 lec_id
)

CREATE TABLE `lecture` ( --강좌 테이블
`lec_id` int PRIMARY KEY AUTO_INCREMENT, --강좌 pk
`lec_name` varchar(50), --강좌 이름
`lec_price` double default 0, --강좌 가격
`lec_category` varchar(50), --강좌 카테고리 'WtoM', 'MtoW', 'EtoF' 등등 각각 단어내고뜻쓰기, 뜻내고단어쓰기, 빈칸채우기
`lec_level` varchar(10), --강좌 난이도 레벨 'bronze', 'silver, 'gold', 'platinum', 'diamond', 'master', 'challenger'
`lec_image_path` varchar(255) --강좌 이미지 경로 '/image/voca.png'
)

CREATE TABLE `quiz` ( --퀴즈 테이블
`quiz_id` int PRIMARY KEY AUTO_INCREMENT, --퀴즈 pk값
`lec_id` int NOT NULL, --어떤강좌에 종속되는 퀴즈인지 강좌테이블의 pk값
`eng_answer` varchar(255), --퀴즈의 영어정답 ex)lion
`kor_answer` varchar(255), --퀴즈의 한글정답 ex)사자
`eng_questions` varchar(255), --퀴즈의 영어3지 선다 ex) lion, tiger, rabit
`kor_questions` varchar(255) --퀴즈의 한글3지 선다 ex) 사자, 호랑이, 토끼
)

CREATE TABLE `lecturestate` ( --강좌 통과유무 테이블
`lec_name` varchar(50), --강좌 이름
`userName` varchar(255), --강좌 통과한유저이름 email형식
`pass_state` char(1) default 'N' --강좌 통과유무 'Y', 'N'
)

CREATE TABLE `board` ( -- 커뮤니티 게시판 테이블
`id` int PRIMARY KEY AUTO_INCREMENT, --게시판 pk값
`title` varchar(255), --게시글제목
`content` varchar(1000), --게시글내용
`writer` varchar(255), --글쓴사람
`created_at` timestamp default now(), --등록날짜
`views` int default 0 --조회수
)
