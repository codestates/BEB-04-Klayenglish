type SignUpAPIBodyType = {
  username: string;
  password: string;
  nickname: string;
};

type LoginAPIResponseType = {
  access_token: string;
};

type LoginAPIBodyType = {
  username: string;
  password: string;
};

type UpdateNameAPIBodyType = {
  nickname: string;
};

type UpdatePasswordAPIBodyType = {
  user_id: number;
  current_password: string;
  new_password: string;
};

type RefreshAccessTokenResponseType = {
  access_token: string;
};

type AuthenticateAPIResponseType = {
  user_id: number;
  username: string;
  password: string;
  nickname: string;
};

type GetProfileAPIResponseType = {
  user_id: number;
  username: string;
  nickname: string;
  created_at: string;
  wallet_address: string;
  balance: number;
};

type GoogleLoginAPIBodyType = {
  google_token: string;
};

type FindpasswordAPIBodyType = {
  username: string;
};
