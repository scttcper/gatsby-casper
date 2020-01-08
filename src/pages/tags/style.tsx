import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { colors } from "../../styles/colors";


export const TagFeed = css`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
  padding: 40px 0 0 0;
  justify-content: space-around;
`;


export const TagBlock = css`
  flex: 1 1 20px;
  height: 30px;

  border-radius: 5px;
  background: ${colors.darkgrey};
  margin: 5px;
  text-align: center;
  color: white;
`;
