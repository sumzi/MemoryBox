import { apiClient, JWTapiClient, JWTapiFileClient } from '.';

// ----------- 로그인
const postLogin = async () => {
  const response = await apiClient.post(`user/login`, {});
  return response.data;
};

// ----------- 로그아웃

const getLogout = async () => {
  const response = await apiClient.get(`user/logout`);

  return response.data;
};

// ------ 마이페이지

// 회원정보 수정
const postMyInfoChange = async () => {
  const response = await JWTapiClient.put(`user`);
  return response.data;
};
// 회원정보 조회
const getUserInfo = async userSeq => {
  const response = await JWTapiClient.get(`user/${userSeq}`);
  return response.data;
};

// 회원탈퇴
const deleteMyInfo = async userSeq => {
  const response = await JWTapiClient.delete(`user/${userSeq}`);
  return response.data;
};

// 회원정보 전체 조회
const getAllUserAdmin = async () => {
  const response = await JWTapiClient.get(`user`);
  return response.data;
};

// 남은 기억함 갯수 확인
const getMybox = async userSeq => {
  const response = await JWTapiClient.get(`user/${userSeq}`);
  return response.data;
};

//
export {
  postLogin,
  getLogout,
  postMyInfoChange,
  getUserInfo,
  deleteMyInfo,
  getAllUserAdmin,
  getMybox,
};
