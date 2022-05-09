import styled from 'styled-components';

const NoMapBoxWrapper = styled.div`
  max-width: 700px;
  padding: 1%;
  height: ${props =>
    // props.num === 2 ? (props.click ? '0px' : props.height) : null};
    props.click ? '0px' : props.sheight};
  /* height: ${props => (props.click ? '0px' : `600px`)}; */
  @media ${props => props.theme.mobile} {
    height: ${props =>
      // props.num === 2 ? (props.click ? '0px' : props.mobileHeight) : null};
      props.click ? '0px' : props.smobileHeight};
    animation: ${props =>
      props.click ? 'sfadeOutDetailMobile 1s' : 'sfadeInDetailMobile 1s'};
  }
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(13px);
  margin: 0 auto;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow-y: visible;
  color: white;
  /* animation: ${props =>
    props.click ? 'fadeOutDetail 1s' : 'fadeInDetail 1s'}; */
  animation: ${props =>
    !props.firstClick
      ? ''
      : props.click
      ? 'sfadeOutDetail 1s'
      : 'sfadeInDetail 1s'};
  /* animation: ${props =>
    !props.firstClick
      ? ''
      : props.num === 2
      ? props.click
        ? 'fadeOutDetail 1s'
        : 'fadeInDetail 1s'
      : null}; */
  overflow: hidden;
  .on {
    animation: ${props => (!props.firstClick ? '' : 'OutDetailContent 1s')};
    @media ${props => props.theme.mobile} {
      animation: ${props => (!props.firstClick ? '' : 'OutMobileContent 1s')};
    }
  }

  .off {
    animation: ${props => (!props.firstClick ? '' : 'InDetailContent 1s')};
    @media ${props => props.theme.mobile} {
      animation: ${props => (!props.firstClick ? '' : 'InMobileContent 1s')};
    }
  }
  @keyframes sfadeOutDetail {
    from {
      height: ${props => props.sheight};
    }

    to {
      height: 0px;
    }
  }
  @keyframes sfadeInDetail {
    from {
      height: 0px;
    }
    to {
      height: ${props => props.sheight};
    }
  }

  @keyframes sfadeOutDetailMobile {
    from {
      height: ${props => props.smobileHeight};
    }

    to {
      height: 0px;
    }
  }
  @keyframes sfadeInDetailMobile {
    from {
      height: 0px;
    }
    to {
      height: ${props => props.smobileHeight};
    }
  }

  @keyframes OutDetailContent {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-100%);
    }
  }

  @keyframes InDetailContent {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0px);
    }
  }

  @keyframes InMobileContent {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0px);
    }
  }
  @keyframes OutMobileContent {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-100%);
    }
  }
`;

const DetailBoxWrapper = styled.div`
  max-width: 700px;
  padding: 1%;
  height: ${props =>
    // props.num === 2 ? (props.click ? '0px' : props.height) : null};
    props.click ? '0px' : props.Dheight};
  /* height: ${props => (props.click ? '0px' : `600px`)}; */
  @media ${props => props.theme.mobile} {
    ${props => console.log(props.DmobileHeight)}
    height: ${props =>
      // props.num === 2 ? (props.click ? '0px' : props.mobileHeight) : null};
      props.click ? '0px' : props.DmobileHeight};
    animation: ${props =>
      props.click ? 'fadeOutDetailMobile 1s' : 'fadeInDetailMobile 1s'};
  }
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(13px);
  margin: 0 auto;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow-y: visible;
  color: white;
  /* animation: ${props =>
    props.click ? 'fadeOutDetail 1s' : 'fadeInDetail 1s'}; */
  animation: ${props =>
    !props.firstClick
      ? ''
      : props.click
      ? 'fadeOutDetail 1s'
      : 'fadeInDetail 1s'};
  /* animation: ${props =>
    !props.firstClick
      ? ''
      : props.num === 2
      ? props.click
        ? 'fadeOutDetail 1s'
        : 'fadeInDetail 1s'
      : null}; */
  overflow: hidden;
  .on {
    animation: ${props => (!props.firstClick ? '' : 'OutDetailContent 1s')};
    @media ${props => props.theme.mobile} {
      animation: ${props => (!props.firstClick ? '' : 'OutMobileContent 1s')};
    }
  }

  .off {
    animation: ${props => (!props.firstClick ? '' : 'InDetailContent 1s')};
    @media ${props => props.theme.mobile} {
      animation: ${props => (!props.firstClick ? '' : 'InMobileContent 1s')};
    }
  }
  @keyframes fadeOutDetail {
    from {
      height: ${props => props.Dheight};
    }

    to {
      height: 0px;
    }
  }
  @keyframes fadeInDetail {
    from {
      height: 0px;
    }
    to {
      height: ${props => props.Dheight};
    }
  }

  @keyframes fadeOutDetailMobile {
    from {
      height: ${props => props.DmobileHeight};
    }

    to {
      height: 0px;
    }
  }
  @keyframes fadeInDetailMobile {
    from {
      height: 0px;
    }
    to {
      height: ${props => props.DmobileHeight};
    }
  }

  @keyframes OutDetailContent {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-100%);
    }
  }

  @keyframes InDetailContent {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0px);
    }
  }

  @keyframes InMobileContent {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0px);
    }
  }
  @keyframes OutMobileContent {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-100%);
    }
  }
`;

const DetailBoxContent = styled.div`
  width: 100%;
`;

const DayWrapper = styled.div`
  width: 92%;
  margin: 0 auto;
  height: 25px;
  /* background-color: red; */
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  .date {
    font-size: 18px;
  }
`;

const DetailContentWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  height: auto;
  min-height: 100px;
`;

const BoxDetailContent = styled.div`
  width: 100%;
  padding: 10px;

  p {
    word-break: keep-all;
    font-size: 18px;
    color: white;
    @media ${props => props.theme.mobile} {
      font-size: 14px;
    }
  }
`;

const DetailInfoWrapper = styled.div`
  width: 95%;
  /* background-color: red; */
  height: fit-content;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  @media ${props => props.theme.mobile} {
    flex-direction: column;
  }
`;

const MapInfoWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-bottom: 10px;
  min-height: 150px;
  height: 250px;
  font-size: 18px;
  color: white;
  font-weight: 1000;
  @media ${props => props.theme.mobile} {
    width: 100%;
    margin: 0 auto;
  }
  .map {
    width: 95%;
    margin-top: 10px;
    border-radius: 10px;
    background-color: red;
    min-height: 150px;
    /* height: 250px; */
  }
`;

const GroupInfoWrapper = styled.div`
  width: ${props => (props.mapInfo ? '40%' : '100%')};
  margin: 0 auto;
  margin-bottom: 20px;
  min-height: 60px;
  height: 95%;
  font-size: 18px;
  color: white;
  font-weight: 1000;
  @media ${props => props.theme.mobile} {
    width: 100%;
  }
  .group {
    width: 95%;
    margin-top: 10px;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;

    .userImage {
      width: 30px;
      height: 30px;
      border-radius: 100%;
      margin: 5px;
    }
  }

  .textcontent {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* background-color: red; */
    p {
      margin: 0;
    }

    .icon {
      cursor: pointer;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-left: 10px;
  @media ${props => props.theme.mobile} {
    flex-direction: column-reverse;
  }
`;

export {
  DetailBoxWrapper,
  DetailBoxContent,
  DayWrapper,
  DetailContentWrapper,
  BoxDetailContent,
  DetailInfoWrapper,
  MapInfoWrapper,
  GroupInfoWrapper,
  NoMapBoxWrapper,
  ButtonGroup,
};
