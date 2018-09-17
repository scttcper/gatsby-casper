import * as React from 'react';
import { Link } from 'gatsby';

export interface PostCardProps {
  post: {
    excerpt: string;
    timeToRead: number;
    fields: {
      slug: string;
    };
    frontmatter: {
      image?: string;
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
        <div className="post-card-image" style={{ backgroundImage: `url(${props.post.frontmatter.image})` }} />
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
            <a href="{{url}}" className="static-avatar">
              <img
                className="author-profile-image"
                src={props.post.frontmatter.author.avatar.children[0].fixed.src}
                alt={props.post.frontmatter.author.id}
              />
            </a>
          </li>
        </ul>
        <span className="reading-time">{props.post.timeToRead} min read</span>
      </footer>
    </div>
  </article>
);

export default PostCard;
