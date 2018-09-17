import { StaticQuery, graphql, Link } from 'gatsby';
import * as React from 'react';

export interface FooterProps {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
      facebook: string;
      twitter: string;
      logo?: string;
    };
  };
}

const Footer: React.SFC<FooterProps> = ({ site }) => {
  return (
    <footer className="site-footer outer">
      <div className="site-footer-content inner">
        <section className="copyright">
          <Link to={site.siteMetadata.siteUrl}>{site.siteMetadata.title}</Link> &copy; swag
        </section>
        <nav className="site-footer-nav">
          <Link to={site.siteMetadata.siteUrl}>Latest Posts</Link>
          {site.siteMetadata.facebook && (
            <a href={site.siteMetadata.facebook} target="_blank" rel="noopener">
              Facebook
            </a>
          )}
          {site.siteMetadata.twitter && (
            <a href={site.siteMetadata.twitter} target="_blank" rel="noopener">
              Twitter
            </a>
          )}

          <a href="https://ghost.org" target="_blank" rel="noopener">
            Ghost
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
