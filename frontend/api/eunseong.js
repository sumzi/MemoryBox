import moment from 'moment';
import Router from 'next/router';
import { loginApiInstance } from '.';
import { getBox } from './box';
import { lockMemoryBoxAPI } from './sumin';
// 이미지
const videos = [
  'assets/images/spring.gif',
  'assets/images/summer.gif',
  'assets/images/fall.gif',
  'assets/images/winter.gif',
];

// progress percent 계산기
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

// JWTToken
const JWTapiClient = loginApiInstance();

// 닫힌 기억함 조회
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

// 기억들 저장
const saveMemoryBox = async ({
  apiBoxId,
  apiContent,
  apiImageUrl,
  apiNickname,
  apiVideoUrl,
  apiVoiceUrl,
  boxIsSolo,
}) => {
  const data = {
    content: apiContent,
    ...(apiImageUrl.length > 0 && { image: apiImageUrl }),
    nickname: apiNickname,
    ...(apiVideoUrl.length > 0 && { video: apiVideoUrl }),
    ...(apiVoiceUrl.length > 0 && { voice: apiVoiceUrl }),
  };
  const response = await JWTapiClient.put(`memory/${apiBoxId}`, data);
  if (boxIsSolo) {
    // 데이터 바로 보내주기
    lockMemoryBoxAPI(apiBoxId);
  }
  return response.data;
};

// 기억틀 생성
const getMemoryBox = async boxId => {
  const response = await JWTapiClient.get(`memory/${boxId}`).then(res => {
    return res.status;
  });
  let data = '';
  // 203 도 처리해주기
  if (response === 201 || response === 203 || response === 200) {
    data = getBox(boxId);
  } else if (response === 208) {
    // /mybox로 넘겨주기
    Router.push(`/ready/${boxId}`);
  }
  return data;
};

export { getMainCloseBox, saveMemoryBox, getMemoryBox };
