import React, { useEffect, useState } from 'react';
import {
  EditWrapper,
  EditContent,
  Block,
  Blank,
  ContentDiv,
  ContentMain,
  ContentFooter,
  Warning,
  CreateToggle,
  ProfileImgContent,
} from './Editinfo.style';
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import AWSs3Upload from '../Register/AWSs3Upload';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUserInfo, deleteMyInfo, postMyInfoChange } from '../../api/user';
import { Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import Router from 'next/router';
import { BASE_URL } from '../../utils/contants';
// import AWS from 'aws-sdk';

const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
const REGION = process.env.NEXT_PUBLIC_UPLOAD_REGION;
const BUCKET = process.env.NEXT_PUBLIC_UPLOAD_BUCKET;

export default function EditInfo() {
  const [checked, setChecked] = useState(false);
  const [imgurl, setImgurl] = useState('');
  // const [firstImg, setFirstImg] = useState('/혼구리2.png');
  const [accountToggle, setAccountToggle] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [putButton, setPutButton] = useState(false);
  const queryClient = useQueryClient();
  const { data: userData, isLoading: userInfoLoading } = useQuery(
    ['userInfo'],
    async () => {
      return getUserInfo();
    },
  );

  const { data, isLoading } = useQuery(
    'userInfo',
    async () => {
      return getUserInfo();
    },
    {
      onSuccess: res => {
        console.log(res, '에딧창');
        setImgurl(res.userProfileImage);
      },
    },
  );

  const userInfoUpdate = useMutation(
    'uploadImg',
    async img => {
      return postMyInfoChange(img);
    },
    {
      onError: err => {
        console.log(err, '이미지업로드 실패');
      },
      onSuccess: res => {
        console.log(res, '이미지업로드');
      },
    },
  );

  const deleteUserApi = useMutation(
    'deleteUser',
    async () => {
      return deleteMyInfo();
    },
    {
      onSuccess: res => {
        console.log(res, '회원탈퇴 성공');
        Router.push('/');
      },
      onError: err => {
        console.log(err, '회원탈퇴 에러');
      },
    },
  );

  if (isLoading) {
    return <>하이</>;
  }

  // console.log(selectedFile.length, '선택파일');

  const changeFileImage = e => {
    if (e.target.files[0] === undefined) {
    } else {
      console.log(e.target.files[0]);
      console.log(e.target.files, '파일');
      setSelectedFile(e.target.files);
      setImgurl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const DeleteAccountToggle = () => {
    setAccountToggle(!accountToggle);
  };

  const onChangeToggle = () => {
    setChecked(!checked);
    setAccountToggle(false);
  };

  const deleteUser = () => {
    Swal.fire({
      title: '숨김 취소',
      text: '숨긴 기억함을 되돌리시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '되돌리기',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      preConfirm: () => {
        deleteUserApi.mutate();
      },
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '탈퇴되었습니다!',
          text: '기억:함(函)을 이용 해 주셔서 정말 감사합니다',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      }
    });
  };

  const getExtension = files => {
    // 확장자 뽑아내기
    const extension = files.name.split('.');
    return extension[extension.length - 1];
  };

  function uploadFile() {
    setPutButton(true);
    const awsS3ImageUrl = `${BASE_URL}profile/${
      userData.userSeq
    }.${getExtension(selectedFile[0])}`;
    console.log(awsS3ImageUrl, '이미지url');
    userInfoUpdate.mutate(awsS3ImageUrl);
    queryClient.invalidateQueries('userInfo');
    Router.push('/mypage');
    // queryClient.
  }

  // useEffect(() => {
  //   console.log('selectedFile 변경됨');
  // }, [selectedFile]);

  // eslint-disable-next-line consistent-return
  return (
    <EditWrapper>
      <EditContent>
        <Block>
          <span>
            <h2>Profile Image</h2>
          </span>
          <ContentDiv>
            <ContentMain>
              <ProfileImgContent>
                <div className="img-container">
                  <p>My Avatar</p>
                  {/* {firstImg ? <img src={firstImg} } */}
                  {imgurl ? (
                    <img src={imgurl} alt="" />
                  ) : (
                    <img src={data.userProfileImage} alt="" />
                  )}
                </div>

                <label className="button" htmlFor="input-file">
                  업로드
                </label>
                <input
                  type="file"
                  id="input-file"
                  style={{ display: 'none' }}
                  onChange={e => changeFileImage(e)}
                  accept="image/*"
                />
              </ProfileImgContent>
            </ContentMain>
            <ContentFooter>
              {imgurl === '' ? (
                <Tooltip title="사진을 등록 해 주세요!" placement="top" arrow>
                  <div className="button" style={{ backgroundColor: 'black' }}>
                    등록전
                  </div>
                </Tooltip>
              ) : (
                <div
                  className="button"
                  style={{ backgroundColor: 'blue' }}
                  onClick={() => uploadFile()}
                >
                  {selectedFile.length > 0 && (
                    <AWSs3Upload
                      type={userData.userSeq}
                      file={selectedFile}
                      putButton={putButton}
                      id="profile"
                    />
                  )}
                  저장하기
                </div>
              )}
            </ContentFooter>
          </ContentDiv>
        </Block>
        <Blank />
        <Block>
          <div className="container">
            <span>
              <h3>Delete Account</h3>
            </span>
            <CreateToggle>
              <Switch onChange={onChangeToggle} />
            </CreateToggle>
          </div>
          <ContentDiv>
            {checked ? (
              <>
                <ContentMain>
                  <p>
                    한번 탈퇴한 계정은 보유했던 추억함 및 모든 내역이
                    삭제됩니다.
                  </p>
                  <p>
                    탈퇴 이후 다시 가입하더라도, 이전 데이터를 복구할 수
                    없습니다.
                  </p>
                  <br />
                  <Warning>
                    <input
                      type="checkbox"
                      onClick={() => DeleteAccountToggle()}
                    />
                    <p>
                      본인은 위 사항에 대해 숙지 하였으며 위 선택을
                      <b>되돌릴 수 없음</b>을 확인하였습니다.
                    </p>
                  </Warning>
                </ContentMain>
                <ContentFooter>
                  {accountToggle ? (
                    <div className="button delete" onClick={() => deleteUser()}>
                      삭제
                    </div>
                  ) : (
                    <div className="button cant-delete">
                      동의 후 삭제 가능합니다.
                    </div>
                  )}
                </ContentFooter>
              </>
            ) : null}
          </ContentDiv>
        </Block>
      </EditContent>
    </EditWrapper>
  );
}
