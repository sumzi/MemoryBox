import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  & > div {
    text-align: center;
    max-width: ${props => props.w};
    margin: 0 auto;
    position: absolute;
    left: 5px;
    right: 5px;
  }
`;

const Header = styled.div`
  font-size: 25px;
  margin-bottom: 30px;
  color: white;
`;

const SlickBlock = styled.div`
  margin: 20px 50px;
  .slick-next {
    right: 10px;
  }
  .slick-prev {
    left: -33px;
  }
  .slick-next::before {
    content: url('/assets/images/right-arrow.png');
    font-size: 40px;
    color: white;
  }
  .slick-prev::before {
    content: url('/assets/images/left-arrow.png');
    font-size: 40px;
    color: white;
  }
`;
const ReadyCard = styled.div`
  padding: 20px 0;
  .ready-card-block {
    display: inline-block;
    height: 200px;
    width: 240px;
    position: relative;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 2px 7px 15px 4px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.15);
    z-index: 10;
  }
  .ready-card-close {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 25px;
    cursor: pointer;
  }
  .ready-card-block img {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 30px;
    margin-bottom: 15px;
    background-color: gray;
  }
  .ready-card-name {
    color: white;
    font-size: 20px;
  }
`;
const OpenCard = styled.div`
  padding: 20px 0;
  .open-card-profile {
    display: inline-block;
    width: 120px;
    height: 120px;
    background-color: white;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      mix-blend-mode: ${props => (props.come ? 'normal' : 'luminosity')};
    }
  }
  .open-card-name {
    font-size: 20px;
    margin-top: 10px;
  }
`;

export { Wrapper, Header, SlickBlock, OpenCard, ReadyCard };
