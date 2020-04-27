import { Link } from 'gatsby';
import * as _ from 'lodash';
import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../styles/colors';
import { PageContext } from '../templates/post';

const AuthorCardSection = styled.section`
  display: flex;
`;

const AuthorCardName = styled.h4`
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

const AuthorCardContent = styled.section`
  p {
    margin: 0;
    color: ${colors.midgrey};
    line-height: 1.3em;
  }
`;

export interface AuthorCardProps {
  author: PageContext['frontmatter']['author'][0];
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  return (
    <AuthorCardSection>
      {/* TODO: default avatar */}
      {/* TODO: author page url */}
      {/* <Img css={AuthorProfileImage} fluid={author.avatar.children[0].fluid} alt={author.id} /> */}
      <AuthorCardContent>
        <AuthorCardName>
          <Link to={`/author/${_.kebabCase(author.id)}/`}>{author.id}</Link>
        </AuthorCardName>
        {author.bio ? (
          <p>{author.bio}</p>
        ) : (
          <p>
            Read <Link to={`/author/${_.kebabCase(author.id)}/`}>more posts</Link> by this author.
          </p>
        )}
      </AuthorCardContent>
    </AuthorCardSection>
  );
};

export default AuthorCard;
