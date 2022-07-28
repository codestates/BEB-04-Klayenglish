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
`lec_source` varchar(255), --강좌 소스 ex) 'bbc', 'cnn', 'newyorktimes'
`lec_level` varchar(10), --강좌 난이도 레벨 'bronze', 'silver, 'gold', 'platinum', 'diamond', 'master', 'challenger'
`lec_image_path` varchar(255) --강좌 이미지 경로 '/image/voca.png'
)
/\* lecture data
insert into lecture (lec_name,lec_price,lec_source,lec_level,lec_image_path) values ('toeic', 10, 'hackers','gold', '/voca.png');
insert into lecture (lec_name,lec_price,lec_source,lec_level,lec_image_path) values ('basic', 13, 'hackers','bronze', '/easy.png');
insert into lecture (lec_name,lec_price,lec_source,lec_level,lec_image_path) values ('middle', 15, 'ybm','diamond', '/cash.png');
insert into lecture (lec_name,lec_price,lec_source,lec_level,lec_image_path) values ('high', 17, 'ybm','master', '/hackers.png');
\*/

CREATE TABLE `quiz` ( --퀴즈 테이블
`quiz_id` int PRIMARY KEY AUTO_INCREMENT, --퀴즈 pk값
`lec_id` int NOT NULL, --어떤강좌에 종속되는 퀴즈인지 강좌테이블의 pk값
`lec_category` varchar(50), --강좌 카테고리 'WtoM', 'MtoW', 'EtoF' 등등 각각 단어내고뜻쓰기, 뜻내고단어쓰기, 빈칸채우기
`eng_answer` varchar(255), --퀴즈의 영어정답 ex) apple^peach^pear^grape^mango
`kor_answer` varchar(255), --퀴즈의 한글정답 ex) 사과^복숭아^배^포도^망고
`eng_questions` varchar(255), --퀴즈의 영어3지 선다 ex) apple^peach^pear^grape^mango
`kor_questions` varchar(255) --퀴즈의 한글3지 선다 ex) 사과^복숭아^배^포도^망고
`eng_choose` varchar(255) --퀴즈의 영어보기 ex) pear|peach|apple^peach|fig|yuja^grape|pear|melon^grape|mango|apple^jujube|yuja|mango
`kor_choose` varchar(255) --퀴즈의 한글보기 ex) 배|복숭아|사과^복숭아|무화과|유자^포도|배|멜론^포도|망고|사과^대추|유자|망고
)

/\_ quiz data
insert into quiz (lec_id,lec_category,eng_questions,kor_answer,kor_choose) values (1,'WtoM','lion^turtle^cat^elephant^tiger','사자^거북이^고양이^코끼리^호랑이','사자|호랑이|토끼^거북이|돼지|소^고양이|코끼리|나무늘보^코끼리|고양이|소^호랑이|사자|거북이');
insert into quiz (lec_id,lec_category,kor_questions,eng_answer,eng_choose) values (1,'MtoW','사자^거북이^고양이^코끼리^호랑이','lion^turtle^cat^elephant^tiger','lion|tiger|rabbit^turtle|pig|cow^cat|elephant|sloth^elephant|cat|cow^tiger|lion|turtle');
-- 사자^거북이^고양이^코끼리^호랑이
-- lion^turtle^cat^elephant^tiger
-- lion|tiger|rabbit^turtle|pig|cow^cat|elephant|sloth^elephant|cat|cow^tiger|lion|turtle
-- 사자|호랑이|토끼^거북이|돼지|소^고양이|코끼리|나무늘보^코끼리|고양이|소^호랑이|사자|거북이
insert into quiz (lec_id,lec_category,eng_questions,kor_answer,kor_choose) values (2,'WtoM','apple^peach^pear^grape^mango','사과^복숭아^배^포도^망고','배|복숭아|사과^복숭아|무화과|유자^포도|배|멜론^포도|망고|사과^대추|유자|망고');
insert into quiz (lec_id,lec_category,kor_questions,eng_answer,eng_choose) values (2,'MtoW','사과^복숭아^배^포도^망고','apple^peach^pear^grape^mango','pear|peach|apple^peach|fig|yuja^grape|pear|melon^grape|mango|apple^jujube|yuja|mango');
-- 사과^복숭아^배^포도^망고
-- apple^peach^pear^grape^mango
-- pear|peach|apple^peach|fig|yuja^grape|pear|melon^grape|mango|apple^jujube|yuja|mango
-- 배|복숭아|사과^복숭아|무화과|유자^포도|배|멜론^포도|망고|사과^대추|유자|망고

insert into quiz (lec_id,lec_category,eng_questions,kor_answer,kor_choose) values (3,'WtoM','guitar^drum^piano^flute^recorder','기타^드럼^피아노^플룻^리코더','기타|피아노|리코더^기타|첼로|드럼^오보에|피아노|오르간^플룻|드럼|피아노^오보에|첼로|리코더');
insert into quiz (lec_id,lec_category,kor_questions,eng_answer,eng_choose) values (3,'MtoW','기타^드럼^피아노^플룻^리코더','guitar^drum^piano^flute^recorder','guitar|piano|recorder^guitar|cello|drum^oboe|piano|organ^flute|drum|piano^oboe|cello|recorder');
-- 기타^드럼^피아노^플룻^리코더
-- guitar^drum^piano^flute^recorder
-- guitar|piano|recorder^guitar|cello|drum^oboe|piano|organ^flute|drum|piano^oboe|cello|recorder
-- 기타|피아노|리코더^기타|첼로|드럼^오보에|피아노|오르간^플룻|드럼|피아노^오보에|첼로|리코더
insert into quiz (lec_id,lec_category,eng_questions,kor_answer,kor_choose) values (4,'WtoM','nose^eyes^skin^mouth^scalp','코^눈^피부^입^두피','코|눈|피부^볼|손목|눈^피부|아래턱|혀^잇몸|입|코^두피|손바닥|아래턱');
insert into quiz (lec_id,lec_category,kor_questions,eng_answer,eng_choose) values (4,'MtoW','코^눈^피부^입^두피','nose^eyes^skin^mouth^scalp','nose|eyes|skin^cheeks|wrist|eyes^skin|jaw|tougue^gums|mouth|nose^scalp|palm|jaw');
-- nose^eyes^skin^mouth^scalp
-- 코^눈^피부^입^두피
-- nose|eyes|skin^cheeks|wrist|eyes^skin|jaw|tougue^gums|mouth|nose^scalp|palm|jaw
-- 코|눈|피부^볼|손목|눈^피부|아래턱|혀^잇몸|입|코^두피|손바닥|아래턱
\*/

CREATE TABLE `lecturestate` ( --강좌 통과유무 테이블
`lec_name` varchar(50), --강좌 이름
`userName` varchar(255), --강좌 통과한유저이름 email형식
`pass_state` char(1) --강좌 통과유무 1d | 2d | ...
)

CREATE TABLE `board` ( -- 커뮤니티 게시판 테이블
`id` int PRIMARY KEY AUTO_INCREMENT, --게시판 pk값
`title` varchar(255), --게시글제목
`content` varchar(1000), --게시글내용
`writer` varchar(255), --글쓴사람
`created_at` timestamp default now(), --등록날짜
`views` int default 0 --조회수
)

CREATE TABLE `qz` ( --바뀐 quiz 테이블
`qz_id` int PRIMARY KEY AUTO_INCREMENT,
`lec_id` int NOT NULL,
`answer` varchar(255),
`question` varchar(255), --delicious|prestigious|cautious
`correct` varchar(255), --0|1|0
`qz_num` int(10), --1,2,3,4 1주차 2주차 3주차 4주차
`qz_category` varchar(10), --e2k, k2e
`created_at` timestamp default now()
)
