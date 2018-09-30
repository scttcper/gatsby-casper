import * as React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import * as _ from 'lodash';

export interface PostCardProps {
  post: {
    excerpt: string;
    timeToRead: number;
    fields: {
      slug: string;
    };
    frontmatter: {
      image?: {
        childImageSharp: {
          sizes: any;
        };
      };
      title: string;
      date: string;
      tags: string[];
      author: {
        id: string;
        bio: string;
        avatar: {
          children: {
            fixed: {
              src: string;
            };
          }[];
        };
      };
    };
  };
}

const PostCard: React.SFC<PostCardProps> = props => (
  <article className="post-card {{post_class}}{{#unless feature_image}} no-image{{/unless}}">
    {props.post.frontmatter.image && (
      <Link className="post-card-image-link" to={props.post.fields.slug}>
        <div className="post-card-image">
          {props.post.frontmatter.image && props.post.frontmatter.image.childImageSharp.sizes && <Img sizes={props.post.frontmatter.image.childImageSharp.sizes} />}
        </div>
      </Link>
    )}
    <div className="post-card-content">
      <Link className="post-card-content-link" to={props.post.fields.slug}>
        <header className="post-card-header">
          <span className="post-card-tags">{props.post.frontmatter.tags[0]}</span>
          <h2 className="post-card-title">{props.post.frontmatter.title}</h2>
        </header>
        <section className="post-card-excerpt">
          <p>{props.post.excerpt}</p>
        </section>
      </Link>
      <footer className="post-card-meta">
        <ul className="author-list">
          <li className="author-list-item">
            <div className="author-name-tooltip">{props.post.frontmatter.author.id}</div>
            <Link className="static-avatar" to={`/author/${_.kebabCase(props.post.frontmatter.author.id)}/`}>
              <img
                className="author-profile-image"
                src={props.post.frontmatter.author.avatar.children[0].fixed.src}
                alt={props.post.frontmatter.author.id}
              />
            </Link>
          </li>
        </ul>
        <span className="reading-time">{props.post.timeToRead} min read</span>
      </footer>
    </div>
  </article>
);

export default PostCard;
