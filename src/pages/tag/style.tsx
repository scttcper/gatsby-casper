import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { colors } from "../../styles/colors";


export const SiteNavCenter = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .site-nav-logo {
    margin-right: 0;
  }
`;

export const ErrorTemplate = css`
  padding: 7vw 4vw;
`;

export const ErrorCode = styled.h1`
  margin: 0;
  font-size: 12vw;
  line-height: 1em;
  letter-spacing: -5px;
  opacity: 0.3;
`;

export const ErrorDescription = styled.p`
  margin: 0;
  color: ${colors.midgrey};
  font-size: 3rem;
  line-height: 1.3em;
  font-weight: 400;
`;

export const ErrorLink = css`
  display: inline-block;
  margin-top: 5px;
`;
