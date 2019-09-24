import styled from "styled-components";

export const CookieBannerStyled = styled.div`
  align-items: center;
  background-color: #ff922a;
  color: white;
  justify-content: center;
  left: 0;
  padding: 1rem 2.2rem 1rem 0.5rem;
  position: fixed;
  top: 0;
  right: 0;
  text-align: center;
  z-index: 90;

  svg {
    font-size: 1.5em;
    margin-right: 0.417em;
  }
`;

export const CookieBannerTextStyled = styled.p`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  margin-right: 0.5rem;

  /* fix for IE11 issue with 'align-items: center' */
  div,
  small {
    max-width: 100%;
  }
`;

export const CookieBannerCloseStyled = styled.div`
  transform: translateY(-50%);
  position: absolute;
  right: 0.5rem;
  top: 50%;

  &:hover {
    cursor: pointer;
  }
`;

export const CookieBannerButtonsStyled = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.875rem;

  button:first-of-type {
    margin-right: 0.5rem;
  }
`;
