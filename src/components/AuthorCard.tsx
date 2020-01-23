import { Link } from 'gatsby';
import * as _ from 'lodash';
import * as React from 'react';
import styled from '@emotion/styled';

import { colors } from '../styles/colors';
import { AuthorProfileImage } from '../styles/shared';

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
  author: any;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
    author = author[0];
  return (
    <AuthorCardSection>
      {/* TODO: default avatar */}
      {/* TODO: author page url */}
      <img css={AuthorProfileImage} src={process.env.GATSBY_FLOTIQ_BASE_URL + '/image/100x100/' + author.avatar[0].id + '.' + author.avatar[0].extension} alt={author.name} />
      <AuthorCardContent>
        <AuthorCardName>
          <Link to={`/author/${_.kebabCase(author.slug)}/`}>{author.name}</Link>
        </AuthorCardName>
        {author.bio ? (
          <p dangerouslySetInnerHTML={{__html: author.bio}} />
        ) : (
          <p>
            Read <Link to={`/author/${_.kebabCase(author.slug)}/`}>more posts</Link> by this author.
          </p>
        )}
      </AuthorCardContent>
    </AuthorCardSection>
  );
};

export default AuthorCard;
