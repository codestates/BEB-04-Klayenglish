import axios from ".";

// 회원가입
export const signUpAPI = (body: SignUpAPIBodyType) => axios.post("/user", body);

// 로그인
export const loginAPI = (body: LoginAPIBodyType) =>
  axios.post<LoginAPIResponseType>("/user/login", body);

// 로그아웃
export const logoutAPI = () => axios.post(`/user/logout`);

// 프로필 정보
export const getProfileAPI = (userId: number) =>
  axios.get<GetProfileAPIResponseType>(`/user/${userId}`);

// 닉네임 변경
export const updateNameAPI = (body: UpdateNameAPIBodyType) =>
  axios.patch("/user/nickname", body);

// 비밀번호 변경
export const updatePasswordAPI = (body: UpdatePasswordAPIBodyType) =>
  axios.patch("/user/password", body);

// 비밀번호 찾기
export const findPasswordAPI = (body: FindpasswordAPIBodyType) =>
  axios.post("/user/find-password", body);

// 회원탈퇴
export const withdrawalAPI = () => axios.delete("/user");

/* ------------------------ 인증 관련 API ------------------------ */

// 액세스 토큰으로 유저 정보 가져오기
export const authenticateAPI = (accessToken: string) =>
  axios.get<AuthenticateAPIResponseType>("/user/authenticate", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

// 리프레쉬 토큰으로 액세스 토큰 재발급
export const refreshAccessTokenAPI = () =>
  axios.get<RefreshAccessTokenResponseType>(`/user/refresh`);
