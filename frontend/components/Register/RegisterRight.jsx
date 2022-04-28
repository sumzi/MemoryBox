import React, { useState } from 'react';
import { ButtonWrapper } from '../Main/Main.style';
import {
  ContentsWrapper,
  HeaderWrapper,
  InnerRightBlock,
  RegisterRightWrapper,
} from './Register.style';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  HiOutlineUser,
  HiOutlineFilm,
  HiOutlinePhotograph,
  HiOutlineClipboard,
  HiOutlineMinusCircle,
} from 'react-icons/hi';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import { Button } from '../../styles/variables';
import AudioRecord from './AudioRecord';
import UploadImage from './UploadImage';
import UploadVideo from './UploadVideo';
import Test from './Test';

export default function RegisterRight() {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  // const [images, setImages] = useState([]);
  // const [imageUrls, setImageUrls] = useState([]);
  const [video, setVideo] = useState('');
  const [record, setRecord] = useState('');

  const handleNickname = e => {
    setNickname(e.target.value);
  };
  const handleContent = e => {
    setContent(e.target.value);
  };
  // const handleImage = e => {
  //   setImages(e.target.value);
  // };
  const handleVideo = e => {
    setVideo(e.target.value);
  };
  const handleRecord = e => {
    setRecord(e.target.value);
  };

  // const saveFileImage = e => {
  //   const imageLists = e.target.files;
  //   let imageUrlLists = [...imageUrls];
  //   if (e.target.files[0] !== undefined) {
  //     for (let i = 0; i < e.target.files.length; i += 1) {
  //       const currentImageUrl = URL.createObjectURL(imageLists[i]);
  //       imageUrlLists.push(currentImageUrl);
  //     }
  //     if (imageUrlLists.length > 10) {
  //       // 이미지 10개로 제한
  //       imageUrlLists = imageUrlLists.slice(0, 10);
  //     }
  //     setImageUrls(imageUrlLists);
  //     setImages(imageLists);
  //   }
  // };

  return (
    <RegisterRightWrapper>
      <InnerRightBlock>
        <HeaderWrapper>
          <div className="title">캡슐 정보 입력</div>
          <Button style={{ fontSize: '15px' }}>친구 초대하기</Button>
        </HeaderWrapper>
        <ContentsWrapper>
          <div className="nickname">
            <div>
              <HiOutlineUser />
              닉네임
            </div>
            <input
              placeholder="닉네임을 입력해주세요"
              onChange={handleNickname}
            />
          </div>
        </ContentsWrapper>
        <ContentsWrapper>
          <div className="content">
            <div>
              <HiOutlineClipboard />
              내용
            </div>
            <textarea
              placeholder="미래에 하고싶은 말을 남겨보세요"
              onChange={handleContent}
            />
          </div>
        </ContentsWrapper>
        <ContentsWrapper>
          <UploadImage />
          {/* {imageUrls.length === 0 ? (
            <div className="image">
              <div>
                <HiOutlinePhotograph />
                이미지 추가하기
              </div>
              <div className="icons">
                <input
                  type="file"
                  accept="image/*"
                  id="imageUpload"
                  multiple
                  onChange={saveFileImage}
                  style={{ display: 'none' }}
                />
                <label htmlFor="imageUpload">
                  <AiOutlinePlusCircle />
                </label>
              </div>
            </div>
          ) : (
            <>
              <div className="image">
                <div>
                  <HiOutlinePhotograph />
                  이미지 미리보기
                </div>
                <div className="icons">
                  <HiOutlineMinusCircle
                    style={{ color: 'red' }}
                    onClick={() => setImageUrls([])}
                  />
                </div>
              </div>
              <div id="preview">
                <Carousel autoplay style={{ width: '300px' }}>
                  {imageUrls.map(imageUrl => {
                    return (
                      <div key={imageUrl}>
                        <img src={imageUrl} alt="" />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </>
          )} */}
        </ContentsWrapper>
        <ContentsWrapper>
          <UploadVideo />
          {/* <div className="video">
            <div>
              <HiOutlineFilm />
              비디오 추가하기
            </div>
            <div className="icons">
              <input
                type="file"
                accept="video/mp4,video/mkv, video/x-m4v,video/*"
                id="videoUpload"
                style={{ display: 'none' }}
              />
              <label htmlFor="videoUpload">
                <AiOutlinePlusCircle />
              </label>
            </div>
          </div> */}
        </ContentsWrapper>
        <ContentsWrapper>
          <AudioRecord />
        </ContentsWrapper>
        <ButtonWrapper>
          <Button>담기</Button>
          <Test />
        </ButtonWrapper>
      </InnerRightBlock>
    </RegisterRightWrapper>
  );
}
