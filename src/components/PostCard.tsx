import { Link } from 'gatsby';
import * as _ from 'lodash';
import { lighten } from 'polished';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { colors } from '../styles/colors';
import { PageContext } from '../templates/post';

const PostCardStyles = css`
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 20px 40px;
  min-height: 300px;
  background: #fff center center;
  background-size: cover;
  border-radius: 5px;
  box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;

  :hover .post-card-image {
    transition: all 2s ease;
    transform: translate3D(0, -1px, 0) scale(1.1);
  }

  .postcard-tag-pill {
    background-color: ${lighten('.35', colors.flotiqBlue)};
    padding: 0 4px;
    border-radius: 4px;
    color: white;
    font-size: 11px;
    font-weight: 600;
    transition: background-color .2s ease;
    min-height: 18px;
    display: inline-flex;
    align-items: center;

    &:hover {
      text-decoration: none;
      background-color: ${lighten('.4', colors.flotiqBlue)};
    }
  }
`;

const PostCardImageLink = css`
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
`;

const PostCardImage = styled.div`
  width: auto;
  height: 200px;
  background: ${colors.lightgrey} no-repeat center center;
  background-size: cover;
  transition: all 2s ease;
`;

const PostCardImageBackground = css`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
`;

const PostCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostCardContentLink = css`
  position: relative;
  flex-grow: 1;
  display: block;
  padding: 25px 25px 0;
  color: ${colors.darkgrey};

  :hover {
    text-decoration: none;
  }
`;

const PostCardTags = styled.span`
  margin-bottom: 4px;
  color: ${colors.midgrey};
  font-size: 1.2rem;
  line-height: 1.15em;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  }
`;

const PostCardTitle = styled.h2`
  margin-top: 0;
`;

const PostCardExcerpt = styled.section`
  font-family: Georgia, serif;
`;

const PostCardMeta = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 25px 25px;
`;

const AuthorList = styled.ul`
  display: flex;
  flex-wrap: wrap-reverse;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const AuthorListItem = styled.li`
  position: relative;
  flex-shrink: 0;
  margin: 0;
  padding: 0;

  :nth-of-type(1) {
    z-index: 10;
  }
  :nth-of-type(2) {
    z-index: 9;
  }
  :nth-of-type(3) {
    z-index: 8;
  }
  :nth-of-type(4) {
    z-index: 7;
  }
  :nth-of-type(5) {
    z-index: 6;
  }
  :nth-of-type(6) {
    z-index: 5;
  }
  :nth-of-type(7) {
    z-index: 4;
  }
  :nth-of-type(8) {
    z-index: 3;
  }
  :nth-of-type(9) {
    z-index: 2;
  }
  :nth-of-type(10) {
    z-index: 1;
  }
  :hover .author-name-tooltip {
    opacity: 1;
    transform: translateY(0px);
  }

  p {
    display: inline-block;
    margin: 0;
    color: ${colors.flotiqBlue};
    font-size: 11px !important;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;

    &:hover {
      text-decoration: none;
    }
  }
`;

// const AuthorNameTooltip = styled.div`
//   position: absolute;
//   bottom: 105%;
//   z-index: 999;
//   display: block;
//   padding: 2px 8px;
//   color: white;
//   font-size: 1.2rem;
//   letter-spacing: 0.2px;
//   white-space: nowrap;
//   background: ${colors.darkgrey};
//   border-radius: 3px;
//   box-shadow: rgba(39, 44, 49, 0.08) 0 12px 26px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
//   opacity: 0;
//   transition: all 0.3s cubic-bezier(0.4, 0.01, 0.165, 0.99);
//   transform: translateY(6px);
//   pointer-events: none;
//
//   @media (max-width: 650px) {
//     display: none;
//   }
// `;

const StaticAvatar = css`
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 0 -5px;
`;

const AuthorProfileImage = styled.img`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 7px;
  background: ${lighten('0.1', colors.lightgrey)};
  border-radius: 50%;
  object-fit: cover;
`;

// const ReadingTime = styled.span`
//   flex-shrink: 0;
//   margin-left: 20px;
//   color: ${colors.midgrey};
//   font-size: 1.2rem;
//   line-height: 33px;
//   font-weight: 500;
//   letter-spacing: 0.5px;
//   text-transform: uppercase;
// `;

export interface PostCardProps {
  post: PageContext;
  isIndex?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const size = '960x600';
  return (
    <article
      className={`post-card ${post.headerImage ? '' : 'no-image'}`}
      css={PostCardStyles}
    >
      {post.headerImage && (
        <Link className="post-card-image-link" css={PostCardImageLink} to={`/${post.slug}`}>
          <PostCardImage className="post-card-image" >
            {post.headerImage && post.headerImage[0] &&
              post.headerImage[0].id &&
              post.headerImage[0].extension && (
              <div css={PostCardImageBackground} style={{ backgroundImage: `url(${'https://api.flotiq.com/image/' + size + '/' + post.headerImage[0].id + '.' + post.headerImage[0].extension})` }} />
            )}
          </PostCardImage>
        </Link>
      )}
      <PostCardContent className="post-card-content">
        <Link className="post-card-content-link" css={PostCardContentLink} to={`/${post.slug}`}>
          <header className="post-card-header">
            {post.tags && post.tags[0] && post.tags[0].tag && <PostCardTags className="postcard-tag-pill">{post.tags[0].tag}</PostCardTags>}
            <PostCardTitle>{post.title}</PostCardTitle>
          </header>
          <PostCardExcerpt>
            <p>{post.excerpt}</p>
          </PostCardExcerpt>
        </Link>
        <PostCardMeta className="post-card-meta">
          <AuthorList>
            <AuthorListItem>
              <Link css={StaticAvatar} to={`/author/${_.kebabCase(post.author[0].slug)}/`}>
                <AuthorProfileImage
                  src={'https://api.flotiq.com/image/40x40/' + post.author[0].avatar[0].id + '.' + post.author[0].avatar[0].extension}
                  alt={post.author[0].name}
                />
                <p>{post.author[0].name}</p>
              </Link>
            </AuthorListItem>
          </AuthorList>
        </PostCardMeta>
      </PostCardContent>
    </article>
  );
};

export default PostCard;
