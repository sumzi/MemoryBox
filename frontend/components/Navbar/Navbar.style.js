import styled from 'styled-components';

const NavbarWrapper = styled.div`
  height: 60px;
  z-index: 100;
  color: white;
  font-size: 20px;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  padding: 13px;
  padding-left: 20px;
`;

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: relative;
  right: 0;
  z-index: 52;
  display: none;
  @media (max-width: 1023px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    cursor: pointer;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? 'black' : '#fff')};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      transform: ${({ open }) => (open ? 'translateX(100%)' : 'translateX(0)')};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const TitleBlock = styled.div`
  font-size: 1.2em;
  label {
    cursor: pointer;
  }
  @media (max-width: 1023px) {
    width: 83%;
    text-align: center;
    color: ${({ open }) => (open ? 'black' : '#fff')};
    z-index: 52;
  }
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  position: absolute;
  right: 0;
  li {
    padding-right: 20px;
  }
  label {
    display: flex;
    cursor: pointer;
    .icons {
      font-size: 1.1em;
      margin-right: 3px;
    }
  }
  @media (max-width: 1023px) {
    z-index: 51;
    flex-flow: column nowrap;
    background-color: white;
    position: absolute;
    transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-100%)')};
    top: 0;
    left: 0;
    height: 235px;
    width: 100%;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: black;
      font-size: 22px;
      display: flex;
      justify-content: center;
      padding: 10px 0;
      border-bottom: 2px solid gray;
    }
  }
`;
const HiddenBodyWrapper = styled.div`
  @media (max-width: 1023px) {
    z-index: 50;
    display: ${({ open }) => (open ? 'block' : 'none')};
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    bottom: 0;
  }
`;

export { NavbarWrapper, Ul, StyledBurger, HiddenBodyWrapper, TitleBlock };
