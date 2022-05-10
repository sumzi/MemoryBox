import React, { useEffect } from 'react';
import { JoinUserWrapper, JoinUserContent } from './JoinUser.style';
import KakaoLogin from './KakaoLogin';
import { SessionStorage } from '../../api';
import Router, { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getBox } from '../../api/box';

export default function JoinUserLogin(props) {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    SessionStorage.setItem('id', id);
  }, [id]);

  const { data: boxData, isLoading: boxDataLoading } = useQuery(
    ['boxData', id],
    async () => {
      return getBox(id);
    },
  );

  return (
    <JoinUserWrapper>
      <JoinUserContent>
        <h2>로그인</h2>
        <h2>{boxData.boxName}</h2>
        <div className="content">
          <h4>
            {boxData.boxName} 기억함입니다.
            <br />
            <br />이 타임캡슐은 {boxData.boxOpenAt}에 열릴 예정입니다.
          </h4>
        </div>
        <KakaoLogin />
      </JoinUserContent>
      {/* <div style={{ marginBottom: '30px' }} /> */}
    </JoinUserWrapper>
  );
}
