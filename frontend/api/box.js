/* eslint-disable no-undef */
import { apiClient, JWTapiClient, JWTapiFileClient } from '.';

// 기억 함 관련 모든 요청 모음 추후 구분이 필요할 시 변경

// 기억함 상세

const getBox = async boxSeq => {
  const response = await JWTapiClient.get(`box/${boxSeq}`);
  return response.data;
};

// 기억함 수정
// obj 예시
// {
//   "boxDescription": "너와 나를 기억하는 기억함",
//   "boxName": "우리를 기억함"
// }

const putBox = async (boxSeq, obj) => {
  const response = await JWTapiClient.put(`box/${boxSeq}`, obj);

  return response.data;
};

// 기억함 삭제

const deleteBox = async boxSeq => {
  const response = await JWTapiClient.delete(`box/${boxSeq}`);
};

// 닫힌 기억함 조회
const getCloseBox = async userSeq => {
  const response = await JWTapiClient.get(`box/close`, {});

  return response.data;
};

// 기억함 생성
// obj 예시
// {
//   "boxDescription": "너와 나를 기억하는 기억함",
//   "boxIsSolo": false,
//   "boxLocAddress": "부산광역시 연제구 연산2동 822-126",
//   "boxLocLat": 35.175405,
//   "boxLocLng": 129.081282,
//   "boxLocName": "처음 만난 곳",
//   "boxName": "우리를 기억함",
//   "boxOpenAt": "2022-09-25 13:00:00"
// }

const postSaveBoxInfo = async obj => {
  const response = await apiClient.post('box/create', obj);

  return response.data;
};

// 열린함 기억 전체 조회
const getAllMemoryOpenBox = async boxSeq => {
  const response = await JWTapiClient.get(`box/memory/${boxSeq}`, {});

  return response.data;
};

// 열린 기억함 조회
const getOpenBox = async userSeq => {
  const response = await JWTapiClient.get(`box/open`);

  return response.data;
};

const getReadyBox = async userSeq => {
  const response = await JWTapiClient.get(`box/ready`);

  return response.data;
};

// 기억함 열기 대기상태 조회
const getReadyOpenBox = async boxSeq => {
  const response = await JWTapiClient.get(`box/unlock-ready/${boxSeq}`);

  return response.data;
};

// 기억함 열기 대기상태 변경
const updateBoxUnlockReady = async (boxSeq, userSeq) => {
  const response = await JWTapiClient.put(
    `box/lock-ready/${boxSeq}/${userSeq}`,
  );
  return response.data;
};

// --------------기억 담기

// 기억함에 새 사용자 기억 틀 생성
const postBoxCreate = async () => {
  const response = await JWTapiClient.get(`memory/${boxSeq}`, {});

  return response.data;
};

// 기억틀에 글로된 기억 담기
const postTextMemory = async () => {
  const response = await JWTapiClient.post(`memory/text`);

  return response.data;
};

// 기억틀에 사진으로 된 기억 담기
const postImgMemory = async () => {
  const response = await JWTapiFileClient.post(`memory/image`);

  return response.data;
};

// 기억함 묻기 준비상태 조회

// 기억함 묻기 준비상태 변경

export {
  getBox,
  putBox,
  deleteBox,
  getCloseBox,
  getReadyBox,
  postSaveBoxInfo,
  getAllMemoryOpenBox,
  updateBoxUnlockReady,
  postBoxCreate,
  postTextMemory,
  postImgMemory,
  getOpenBox,
  getReadyOpenBox,
};
