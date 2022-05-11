import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { HiOutlineFilm, HiOutlineMinusCircle } from 'react-icons/hi';
import { BASE_URL } from '../../utils/contants';
import AWSs3Upload, { getExtension } from './AWSs3Upload';
import { v4 as uuidv4 } from 'uuid';

export default function UploadVideo(props) {
  const [thumbnail, setThumbnail] = useState('');
  const [videos, setVideos] = useState('');
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [uuid, setUuid] = useState();

  const resetVideo = () => {
    // 이미지 초기화
    setVideos([]);
    setUuid();
    props.setParentsVideos([]);
    setThumbnail('');
  };

  const makeThumbnail = event => {
    let file = event.target.files[0];
    if (file.size > 262144000) {
      // 동영상 용량 제한
      alert('동영상 파일은 250mb 까지 업로드 할 수 있습니다.');
      return;
    }
    let fileReader = new FileReader();

    const fileExt = file.name.split('.').pop();
    setProgress(0);
    setSelectedFile(event.target.files[0]);

    fileReader.onload = () => {
      let blob = new Blob([fileReader.result], { type: file.type });
      let url = URL.createObjectURL(blob);
      let video = document.createElement('video');

      let snapImage = () => {
        let canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas
          .getContext('2d')
          .drawImage(video, 0, 0, canvas.width, canvas.height);
        let image = canvas.toDataURL();
        let success = image.length > 100000;
        if (success) {
          setThumbnail(image);
          URL.revokeObjectURL(url);
        }
        return success;
      };
      let timeupdate = () => {
        if (snapImage()) {
          video.removeEventListener('timeupdate', timeupdate);
          video.pause();
        }
      };
      video.addEventListener('loadeddata', () => {
        if (snapImage()) {
          video.removeEventListener('timeupdate', timeupdate);
        }
      });
      video.addEventListener('timeupdate', timeupdate);
      video.preload = 'metadata';
      video.src = url;
      // Load video in Safari / IE11
      video.muted = true;
      video.playsInline = true;
      video.play();
    };
    fileReader.readAsArrayBuffer(file);

    setVideos(file);
    const extension = getExtension(file); // 확장자 지정
    const videoUUID = uuidv4();
    setUuid(`${videoUUID}.${extension}`);
    props.setParentsVideos([
      `${BASE_URL}${props.id}/video/${videoUUID}.${extension}`,
    ]);
  };
  return (
    <>
      {videos.length === 0 ? (
        <div className="video">
          <div>
            <HiOutlineFilm />
            영상으로 된 기억 추가하기
          </div>
          <div className="icons">
            <input
              type="file"
              accept="video/mp4,video/mkv, video/x-m4v,video/*"
              id="videoUpload"
              style={{ display: 'none' }}
              onChange={makeThumbnail}
            />
            <label htmlFor="videoUpload">
              <AiOutlinePlusCircle />
            </label>
          </div>
        </div>
      ) : (
        <div className="video">
          <div>
            <HiOutlineFilm />
            썸네일 미리보기
          </div>
          <div className="icons">
            <HiOutlineMinusCircle
              style={{ color: 'red' }}
              onClick={resetVideo}
            />
          </div>
        </div>
      )}
      {selectedFile && (
        <AWSs3Upload
          type="video"
          file={selectedFile}
          putButton={props.putButton}
          id={props.id}
          uuid={uuid}
        />
      )}
      {thumbnail !== '' && (
        <div className="video-preview">
          <div className="video-preview-image">
            <div className="video-preview-name">Video_Thumbnail</div>
            <img src={thumbnail} alt="" />
          </div>
        </div>
      )}
    </>
  );
}
