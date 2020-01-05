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
  TagList,
  TagListItem,
  TagText,
  TagLink,
  PublishedDate,
  PostCardCategory,
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
            {post.frontmatter.category && (
              <Link to={`/categories/${_.kebabCase(post.frontmatter.category[post.frontmatter.category.length - 1])}/`}>
                <PostCardCategory>{post.frontmatter.category[post.frontmatter.category.length - 1]}</PostCardCategory>
              </Link>
            )}
            <PostCardTitle>{post.frontmatter.title}</PostCardTitle>
          </header>
          <PostCardExcerpt>
            <p>{post.frontmatter.description}</p>
          </PostCardExcerpt>
        </Link>
        <PostCardMeta className="post-card-meta">
          {/** TODO: if overflow, add ...  */}
          <TagList>
            {post.frontmatter.tags.map(tag => (
              <TagListItem>
                <Link css={TagLink} to={`/tags/${_.kebabCase(tag)}/`}>
                  <TagText>
                    {`# ${tag}`}
                  </TagText>
                </Link>
              </TagListItem>
            ))}
          </TagList>
          <PublishedDate>{post.frontmatter.cardDate}</PublishedDate>
        </PostCardMeta>
      </PostCardContent>
    </article>
  );
};

export default PostCard;
