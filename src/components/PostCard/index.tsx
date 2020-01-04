import { Link } from "gatsby";
import Img from "gatsby-image";
import * as _ from "lodash";
import * as React from "react";

import {
  PostCardStyles,
  PostCardImageLink,
  PostCardImage,
  PostCardContent,
  PostCardContentLink,
  PostCardTitle,
  PostCardExcerpt,
  PostCardMeta,
  PostCardTags,
  AuthorList,
  AuthorListItem,
  ReadingTime,
  AuthorNameTooltip,
  AuthorProfileImage,
  StaticAvatar
} from "./style";
import { PageContext } from "../../templates/post";

export interface PostCardProps {
  post: PageContext;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article
      className={`post-card ${post.frontmatter.image ? "" : "no-image"}`}
      css={PostCardStyles}
    >
      {post.frontmatter.image && (
        <Link
          className="post-card-image-link"
          css={PostCardImageLink}
          to={post.fields.slug}
        >
          <PostCardImage className="post-card-image">
            {post.frontmatter.image &&
              post.frontmatter.image.childImageSharp &&
              post.frontmatter.image.childImageSharp.fluid && (
                <Img
                  alt={`${post.frontmatter.title} cover image`}
                  style={{ height: "100%" }}
                  fluid={post.frontmatter.image.childImageSharp.fluid}
                />
              )}
          </PostCardImage>
        </Link>
      )}
      <PostCardContent className="post-card-content">
        <Link
          className="post-card-content-link"
          css={PostCardContentLink}
          to={post.fields.slug}
        >
          <header className="post-card-header">
            {/** Tag[0]이 아니라, 카테고리로 바꿔줘야 함 */}
            {post.frontmatter.category && (
              <PostCardTags>{post.frontmatter.category[0]}</PostCardTags>
            )}
            <PostCardTitle>{post.frontmatter.title}</PostCardTitle>
          </header>
          <PostCardExcerpt>
            <p>{post.frontmatter.description}</p>
          </PostCardExcerpt>
        </Link>
        <PostCardMeta className="post-card-meta">
          {/** 이 부분은 tag들, 날짜로 바꾸는 것이 좋을듯. */}
          <AuthorList>
            <AuthorListItem>
              <AuthorNameTooltip className="author-name-tooltip">
                {post.frontmatter.author.id}
              </AuthorNameTooltip>
              <Link
                css={StaticAvatar}
                to={`/author/${_.kebabCase(post.frontmatter.author.id)}/`}
              >
                <AuthorProfileImage
                  src={post.frontmatter.author.avatar.children[0].fixed.src}
                  alt={post.frontmatter.author.id}
                />
              </Link>
            </AuthorListItem>
          </AuthorList>
          {/** Need to re-format date */}
          <ReadingTime>{post.frontmatter.cardDate}</ReadingTime>
        </PostCardMeta>
      </PostCardContent>
    </article>
  );
};

export default PostCard;
