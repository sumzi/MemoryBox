import React from 'react';
import {
  ButtonWrapper,
  MainLeftWrapper,
  MainRightWrapper,
  MainWrapper,
  MobileWrapper,
  VideoWrapper,
} from './Main.style';
import 'antd/dist/antd.css';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import ProgressBar from './ProgressBar';

export default function MainPage() {
  // const datas = [
  //   {
  //     dDay: '1550일 14:12',
  //     title: '부울경 2반의 추억여행',
  //     content:
  //       '부울경 2반의 추억여행 타임캡슐 입니다. 이 타임캡슐은 10년 뒤 open 될 예정입니다. 다들 즐거운 추억 보관하시길 바랍니다.',
  //   },
  //   {
  //     dDay: '15일 14:12',
  //     title: '부울경 1반의 추억여행',
  //     content:
  //       '부울경 2반의 추억여행 타임캡슐 입니다. 이 타임캡슐은 10년 뒤 open 될 예정입니다. 다들 즐거운 추억 보관하시길 바랍니다.',
  //   },
  //   {
  //     dDay: '1550일 14:12',
  //     title: '부울경 3반의 추억여행',
  //     content:
  //       '부울경 모여라 10년 뒤 open 될 예정입니다. 다들 즐거운 추억 보관하시길 바랍니다.',
  //   },
  //   {},
  // ];
  return (
    <MainWrapper>
      <MainLeftWrapper>
        <div className="d-day">
          도착까지
          <div className="time"> 1550일 14 : 12</div>
        </div>
        <div className="title">부울경 2반의 추억여행</div>
        <div className="content">
          <p>
            부울경 2반의 추억여행 타임캡슐 입니다. 이 타임캡슐은 10년 뒤 open 될
            예정입니다. 다들 즐거운 추억 보관하시길 바랍니다.
          </p>
        </div>
      </MainLeftWrapper>
      <MainRightWrapper>
        <VideoWrapper>
          {/* <div>비디오</div> */}
          <div>
            <img src="/image.gif" alt="" />
          </div>
          {/* <video
          src="/assets/video/혼자어때.mp4"
          autoPlay
          muted
          loop
          width="100%"
          height="100%"
        /> */}
        </VideoWrapper>
        <ProgressBar percent="50" />
        <ButtonWrapper>
          <AiOutlineDoubleLeft className="leftBtn" />
          <AiOutlineDoubleRight className="rightBtn" />
        </ButtonWrapper>
        {/* 모바일 시 보임 */}
        <MobileWrapper>
          <div className="d-day">
            도착까지
            <div className="time"> 1550일 14 : 12</div>
          </div>
          <div className="title">부울경 2반의 추억여행</div>
          <div className="content">
            부울경 2반의 추억여행 타임캡슐 입니다. 이 타임캡슐은 10년 뒤 open 될
            예정입니다. 다들 즐거운 추억 보관하시길 바랍니다.
          </div>
        </MobileWrapper>
      </MainRightWrapper>
    </MainWrapper>
  );
}
