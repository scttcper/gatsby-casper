import { Link } from 'gatsby';
import * as _ from 'lodash';
import * as React from 'react';

export interface AuthorCardProps {
  author: any;
}

const AuthorCard: React.SFC<AuthorCardProps> = ({ author }) => {
  return (
    <section className="author-card">
      {/* TODO: default avatar */}
      {/* TODO: author page url */}
      <img className="author-profile-image" src={author.avatar.children[0].fixed.src} alt={author.id} />
      <section className="author-card-content">
        <h4 className="author-card-name">
          <Link to={`/author/${_.kebabCase(author.id)}/`}>{author.id}</Link>
        </h4>
        {author.bio ? (
          <p>{author.bio}</p>
        ) : (
          <p>
            Read <Link to={`/author/${_.kebabCase(author.id)}/`}>more posts</Link> by this author.
          </p>
        )}
      </section>
    </section>
  );
};

export default AuthorCard;
