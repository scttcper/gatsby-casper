import styled from "@emotion/styled";
import { colors } from "../../styles/colors";

export const AuthorCardSection = styled.section`
  display: flex;
`;

export const AuthorCardName = styled.h4`
  margin: 8px 0 2px 0;
  padding: 0;
  font-size: 2rem;

  a {
    color: ${colors.darkgrey};
    font-weight: 700;
  }

  a:hover {
    text-decoration: none;
  }
`;

export const AuthorCardContent = styled.section`
  p {
    margin: 0;
    color: ${colors.midgrey};
    line-height: 1.3em;
  }
`;
