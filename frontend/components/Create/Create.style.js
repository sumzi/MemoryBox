import styled from 'styled-components';

const CreateBlock = styled.div`
  height: 600px;
  width: 480px;
  min-width: 350px;
  background-color: rgba(255, 255, 255, 0.15);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 40px;
  font-size: 15px;
  .create-title {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 12px;
    text-align: center;
  }
  .create-person {
    justify-content: space-between;
  }

  @media ${props => props.theme.tablet} {
    padding: 30px 20px;
    font-size: 12px;
    transform: none;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: auto;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    .create-title {
      font-size: 20px;
    }
  }
`;

const CreateItem = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  position: relative;
  input,
  textarea {
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 20px;
    padding: 12px 18px;
    border: none;
    outline: none;
    resize: none;
  }
  @media ${props => props.theme.tablet} {
    input,
    textarea {
      border-radius: 18px;
    }
  }
`;

const CreateAddress = styled.div`
  input {
    cursor: pointer;
  }
  .create-address-icon {
    position: absolute;
    right: 20px;
    top: 18px;
    font-size: 28px;
    color: gray;
  }
  .create-address {
    display: none;
  }
  .create-address-checked {
    animation: fadein 1s;
    display: block;
  }
  @media ${props => props.theme.tablet} {
    .create-address-icon {
      font-size: 22px;
    }
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const CreateDate = styled.div`
  padding: 10px 0;
  .ant-picker {
    background-color: inherit;
    width: 100%;
    padding: 0;
    box-shadow: none;
    border: none;
  }
  .ant-picker:hover {
    box-shadow: none;
  }
  .ant-picker-input {
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 20px;
    padding: 12px 18px;
    & > input {
      font-size: 15px;
      ::placeholder {
        color: gray;
      }
    }
  }
  .ant-picker-suffix {
    font-size: 25px;
    margin-right: 5px;
    color: gray;
  }
  .ant-picker-clear {
    font-size: 25px;
    margin-right: 22px;
  }
  @media ${props => props.theme.tablet} {
    .ant-picker {
      width: 100%;
      padding: 0;
      box-shadow: none;
      border: none;
    }
    .ant-picker-input {
      & > input {
        font-size: 12px;
      }
    }
    .ant-picker-suffix {
      font-size: 19px;
    }
    .ant-picker-clear {
      font-size: 20px;
    }
  }
`;

const CreatePerson = styled.div`
  background-color: ${props => (props.selected ? '#ffebd2' : 'white')};
  border-radius: 20px;
  padding: 12px 15px;
  width: 47%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  svg {
    color: ${props => (props.selected ? '#ffa53a' : 'gray')};
    font-size: 26px;
    margin-right: 5px;
  }
  &:hover {
    background-color: #ffebd2;
    transition: 0.3s;
    svg {
      color: #ffa53a;
    }
  }
  @media ${props => props.theme.tablet} {
    svg {
      font-size: 19px;
    }
  }
`;

const CreateToggle = styled.div`
  padding-top: 10px;
  display: flex;
  .ant-switch {
    margin: 0 8px;
  }
  .ant-switch-checked {
    background-color: #ffa53a;
  }
  .ant-switch-checked:focus {
    box-shadow: none;
  }
`;

export {
  CreateBlock,
  CreateItem,
  CreateAddress,
  CreateDate,
  CreatePerson,
  CreateToggle,
};