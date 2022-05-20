import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';

const NoDataWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const NoDataContent = styled.div`
  width: 100%;
  height: 60vh;
  padding: 2%;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(13px);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .button {
    width: 60%;
    height: 80px;
    background-color: #ffebd2;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    font-size: 32px;
    color: black;
    @media ${props => props.theme.mobile} {
      width: 80%;
    }
    &:hover {
      background-color: #ffa53a;
      transition: 0.3s;
    }
  }
`;

export default function Nodata(props) {
  function goToCreate() {
    Router.push('/create');
  }

  function goToTreasure() {
    Router.push('/treasure');
  }

  function MakeText() {
    // 준비중인 기억함일때
    if (props.state === 'ready') {
      return (
        <>
          <h1>아직까지 만든 기억함이 없어요!!</h1>
          <h2>추억을 보관하러 가볼까요?!</h2>
          <div
            className="button"
            onClick={() => {
              goToCreate();
            }}
          >
            기억상자 만들러 가기
          </div>
        </>
      );
    }
    return (
      <>
        <h1>아직까지 배달 완료된 기억함이 없어요!!</h1>
        <h2>보물을 찾으러 떠나볼까요?</h2>
        <div
          className="button"
          onClick={() => {
            goToTreasure();
          }}
        >
          보물찾으러 떠나기
        </div>
      </>
    );
  }

  return (
    <NoDataWrapper>
      <NoDataContent>
        <h1>기억:함(函)</h1>
        {MakeText()}
      </NoDataContent>
    </NoDataWrapper>
  );
}
