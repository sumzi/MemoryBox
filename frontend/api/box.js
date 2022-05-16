/* eslint-disable no-undef */
import { apiClient, loginApiInstance, JWTapiFileClient } from '.';
const JWTapiClient = loginApiInstance();
// 기억 함 관련 모든 요청 모음 추후 구분이 필요할 시 변경

// 메인 이미지
const videos = [
  '/assets/images/spring.gif',
  '/assets/images/summer.gif',
  '/assets/images/fall.gif',
  '/assets/images/winter.gif',
];

// 메인 progress percent 계산기
function getPercent(boxCreatedAt, boxOpenAt) {
  const StartDay = new Date(boxCreatedAt);
  const Dday = new Date(boxOpenAt);
  const today = new Date();
  const distance = Dday.getTime() - today.getTime();
  const totalDayLength = Dday.getTime() - StartDay.getTime();
  if (today.getTime() > Dday.getTime()) {
    return 100;
  }
  const leftDay = ((totalDayLength - distance) / totalDayLength) * 100;
  const leftDayPer = Math.floor(leftDay);
  return leftDayPer;
}

// 기억함 상세

const getBox = async boxSeq => {
  const response = await apiClient.get(`box/detail/${boxSeq}`);
  return response.data;
};

// 닫힌 기억함 조회
const getCloseBox = async userSeq => {
  const response = await JWTapiClient.get(`box/close`, {});

  return response.data;
};

// 메인 닫힌 기억함 조회
const getMainCloseBox = async () => {
  const data = [];
  const response = await JWTapiClient.get(`box/list`).then(ress => {
    ress.data.boxList[0].box.map(res => {
      if (res.boxType === 2) {
        const Dday = new Date(res.boxOpenAt.replace(/-/g, '/'));
        const today = new Date();
        const distance =
          (Dday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        const hour = (distance % 1) * 24;
        const minute = (hour % 1) * 60;
        const nowPercent = getPercent(
          res.boxCreatedAt.replace(/-/g, '/'),
          res.boxOpenAt.replace(/-/g, '/'),
        );
        // 퍼센트별로 이미지 변경
        let nowImage = 0;
        if (nowPercent < 25) {
          nowImage = 0;
        } else if (nowPercent >= 25 && nowPercent < 50) {
          nowImage = 1;
        } else if (nowPercent >= 50 && nowPercent < 75) {
          nowImage = 2;
        } else {
          nowImage = 3;
        }
        data.push({
          title: res.boxName,
          content: res.boxDescription,
          dDay: Math.floor(distance),
          dDayHour: Math.floor(hour),
          dDayMinute: Math.floor(minute),
          percent: nowPercent,
          imageSrc: videos[nowImage],
        });
        return {
          title: res.boxName,
          content: res.boxDescription,
          dDay: Math.floor(distance),
          dDayHour: Math.floor(hour),
          dDayMinute: Math.floor(minute),
          percent: nowPercent,
          imageSrc: videos[nowImage],
        };
      }
      return 0;
    });
  });
  if (data.length === 0) {
    // 닫힌 함이 없을때
    return 0;
  }
  return data;
};

const getAllBox = async () => {
  const response = await JWTapiClient.get(`box/list`).catch(function (err) {
    if (err.response.status === 401) {
      alert('로그인이 만료 되었습니다');
      window.location.replace(`${window.location.origin}/login`);
    }
  });

  return response.data;
};
// 열린 기억함 조회
// 기억함 열기 대기상태 조회
// 기억틀에 글로된 기억 담기

const getHideBox = async () => {
  const response = await JWTapiClient.get(`box/hide`);
  return response.data;
};

const putHideBox = async boxId => {
  const response = await JWTapiClient.put(`box/hide/${boxId}`);
  return response.data;
};

const putShowBox = async boxId => {
  const response = await JWTapiClient.put(`box/show/${boxId}`);
  return response.data;
};

// 기억함 상세정보 가져오기
const getBoxMemories = async boxSeq => {
  const result = await JWTapiClient.get(`box/${boxSeq}/memory`).then(
    res => res.data,
  );
  const memories = [];
  let cnt = 0;
  let isAudio = false;
  result.boxMemories.forEach(memory => {
    const tmp = {
      email: memory.userEmail,
      profile: memory.userProfileImage,
      nickname: memory.userBoxNickname,
    };
    if (memory.text != null) {
      memories.push({ ...tmp, value: memory.text, type: 1, color: (cnt += 1) });
    }
    if (memory.image.length > 0) {
      memory.image.forEach(item =>
        memories.push({ ...tmp, value: item, type: 2, color: 0 }),
      );
    }
    if (memory.video.length > 0) {
      memory.video.forEach(item =>
        memories.push({ ...tmp, value: item, type: 3, color: 0 }),
      );
    }
    if (memory.voice != null) {
      isAudio = true;
      memories.push({ ...tmp, value: memory.voice, type: 4, color: 0 });
    }
  });
  const shuffle = array => {
    array.sort(() => Math.random() - 0.5);
  };
  shuffle(memories);
  return {
    ...result.memoriesBoxDetailBean,
    memories,
    isAudio,
  };
};

export {
  getBox,
  getMainCloseBox,
  getCloseBox,
  getAllBox,
  getHideBox,
  putHideBox,
  putShowBox,
  getBoxMemories,
};
