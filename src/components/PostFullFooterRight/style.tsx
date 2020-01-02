import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { lighten } from "polished";

import { colors } from "../../styles/colors";

export const PostFullFooterRightDiv = styled.div`
  flex-shrink: 0;
  margin-left: 20px;
`;

export const AuthorCardButton = css`
  display: block;
  padding: 9px 16px;
  /* border: color(var(--midgrey) l(+20%)) 1px solid; */
  border: ${lighten("0.2", colors.midgrey)} 1px solid;
  color: ${colors.midgrey};
  font-size: 1.2rem;
  line-height: 1;
  font-weight: 500;
  border-radius: 20px;
  transition: all ease 0.2s;

  :hover {
    border-color: ${colors.blue};
    color: ${colors.blue};
    text-decoration: none;
  }
`;
