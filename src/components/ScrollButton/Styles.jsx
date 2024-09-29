import styled from "styled-components";

export const Button = styled.div`
  position: fixed;
  /* transform: scale(1.1); */
  width: 100%;
  left: 92%;
  top: 85%;
  height: 20px;
  font-size: 3.5rem;
  z-index: 1;
  cursor: pointer;
  color: #4f4f4f;

  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    left: 82%;
    top: 88%;
  }
`;
