import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { colors } from "../../styles/colors";


export const TagDiv = styled.div`
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 0 -20px;
  padding: 40px 0 40px 0;
  border-radius: 5px;
  min-height: 160px;


  @media (min-width: 900px) {
    margin-top: -70px;
    padding-top: 60px;
    padding-bottom: 60px;
  }
`;

export const TagFeed = css`
  position: relative;
  display: flex;
  margin-top: 0px;
  margin-left: 20px;
  margin-right: 20px;
  flex-wrap: wrap;
  justify-content: center;



`;


export const TagBlock = css`
  height: 30px;
  padding: 0px 5px;
  border-radius: 5px;
  font-size: 1.5rem;
  margin: 5px;
  text-align: center;
  color: #636363;
`;
